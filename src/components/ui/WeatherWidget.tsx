import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun, Cloud, CloudRain, CloudSnow, CloudDrizzle, CloudLightning,
  Wind, Thermometer, Droplets, Eye, MapPin, RefreshCw, X
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  description: string;
  icon: string;
  visibility: number;
}

// Map weather condition codes to icons and translated descriptions
const getWeatherIcon = (code: string) => {
  if (code.includes('01')) return Sun;
  if (code.includes('02') || code.includes('03') || code.includes('04')) return Cloud;
  if (code.includes('09')) return CloudDrizzle;
  if (code.includes('10')) return CloudRain;
  if (code.includes('11')) return CloudLightning;
  if (code.includes('13')) return CloudSnow;
  return Sun;
};

const WEATHER_DESC_SL: Record<string, string> = {
  'clear': 'Jasno',
  'clouds': 'Oblačno',
  'rain': 'Deževno',
  'drizzle': 'Rosenje',
  'thunderstorm': 'Nevihta',
  'snow': 'Sneženje',
  'mist': 'Megla',
  'fog': 'Megla',
};

const WEATHER_DESC_DE: Record<string, string> = {
  'clear': 'Klar',
  'clouds': 'Bewölkt',
  'rain': 'Regen',
  'drizzle': 'Nieselregen',
  'thunderstorm': 'Gewitter',
  'snow': 'Schnee',
  'mist': 'Nebel',
  'fog': 'Nebel',
};

interface WeatherWidgetProps {
  compact?: boolean;
}

const WeatherWidget = ({ compact = false }: WeatherWidgetProps) => {
  const { language } = useLanguage();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState(!compact);

  const translations: Record<string, Record<string, string>> = {
    en: {
      title: 'Current Weather in Bled',
      feelsLike: 'Feels like',
      humidity: 'Humidity',
      wind: 'Wind',
      visibility: 'Visibility',
      refresh: 'Refresh',
      perfect: 'Perfect weather for outdoor activities!',
      rainy: 'Great day for indoor activities — try our wellness center!',
      cold: 'Bundle up! Perfect for a cozy day at the villa.',
      hot: 'Stay cool! The lake is perfect for swimming today.',
      cloudy: 'Pleasant conditions for sightseeing around Bled.',
    },
    sl: {
      title: 'Trenutno vreme v Bledu',
      feelsLike: 'Občutek',
      humidity: 'Vlažnost',
      wind: 'Veter',
      visibility: 'Vidljivost',
      refresh: 'Osveži',
      perfect: 'Popolno vreme za zunanje aktivnosti!',
      rainy: 'Odličen dan za notranje aktivnosti — obiščite naš wellness center!',
      cold: 'Otoplite se! Popolno za klobasno dnevilo na vili.',
      hot: 'Ostanite hladni! Jezero je danes popolno za kopanje.',
      cloudy: 'Prijetne razglede za ogled Bleda.',
    },
    de: {
      title: 'Aktuelles Wetter in Bled',
      feelsLike: 'Gefühlt',
      humidity: 'Luftfeuchtigkeit',
      wind: 'Wind',
      visibility: 'Sichtweite',
      refresh: 'Aktualisieren',
      perfect: 'Perfektes Wetter für Outdoor-Aktivitäten!',
      rainy: 'Toller Tag für Indoor-Aktivitäten — besuchen Sie unser Wellnesscenter!',
      cold: 'Warm anziehen! Perfekt für einen gemütlichen Tag in der Villa.',
      hot: 'Bleiben Sie cool! Der See ist heute perfekt zum Schwimmen.',
      cloudy: 'Angenehme Bedingungen für Sightseeing rund um Bled.',
    },
    it: {
      title: 'Meteo attuale a Bled',
      feelsLike: 'Percepita',
      humidity: 'Umidità',
      wind: 'Vento',
      visibility: 'Visibilità',
      refresh: 'Aggiorna',
      perfect: 'Tempo perfetto per attività all\'aperto!',
      rainy: 'Ottima giornata per attività al coperto — provate il nostro centro benessere!',
      cold: 'Copritevi bene! Perfetta per una giornata accogliente alla villa.',
      hot: 'Rimanete freschi! Il lago è perfetto per nuotare oggi.',
      cloudy: 'Condizioni piacevoli per visitare Bled.',
    },
  };

  const t = translations[language] || translations.en;

  const fetchWeather = async () => {
    setLoading(true);
    setError(false);
    try {
      // Using Open-Meteo — free, no API key needed
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=46.3683&longitude=14.1147&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,visibility&wind_speed_unit=kmh&timezone=Europe%2FLjubljana'
      );
      if (!response.ok) throw new Error('Weather fetch failed');
      const data = await response.json();
      const current = data.current;

      // Map WMO weather codes to descriptions
      const code = current.weather_code;
      let description = 'clear';
      if (code <= 1) description = 'clear';
      else if (code <= 48) description = 'clouds';
      else if (code <= 67) description = 'rain';
      else if (code <= 77) description = 'snow';
      else if (code <= 82) description = 'rain';
      else if (code <= 86) description = 'snow';
      else if (code <= 99) description = 'rain';

      setWeather({
        temp: Math.round(current.temperature_2m),
        feelsLike: Math.round(current.apparent_temperature),
        humidity: current.relative_humidity_2m,
        wind: Math.round(current.wind_speed_10m),
        description,
        icon: description,
        visibility: Math.round((current.visibility || 10000) / 1000),
      });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 600000); // Refresh every 10 minutes
    return () => clearInterval(interval);
  }, []);

  const WeatherIcon = weather ? getWeatherIcon(weather.icon) : Sun;

  const getActivitySuggestion = () => {
    if (!weather) return '';
    if (weather.temp >= 25) return t.perfect;
    if (weather.description === 'rain' || weather.description === 'drizzle') return t.rainy;
    if (weather.temp < 5) return t.cold;
    if (weather.description === 'clouds') return t.cloudy;
    return t.perfect;
  };

  const getTranslatedDescription = () => {
    if (!weather) return '';
    if (language === 'sl') return WEATHER_DESC_SL[weather.description] || 'Jasno';
    if (language === 'de') return WEATHER_DESC_DE[weather.description] || 'Klar';
    return weather.description.charAt(0).toUpperCase() + weather.description.slice(1);
  };

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4 text-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
        onClick={() => setExpanded(!expanded)}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span className="text-sm">...</span>
          </div>
        ) : weather ? (
          <div className="flex items-center gap-3">
            <WeatherIcon className="w-8 h-8" />
            <div>
              <div className="text-xl font-bold">{weather.temp}°C</div>
              <div className="text-xs opacity-80">{getTranslatedDescription()}</div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Bled</span>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      {expanded && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-gradient-to-br from-blue-500/90 to-indigo-600/90 backdrop-blur-sm rounded-2xl p-6 text-white shadow-xl relative"
        >
          <button
            onClick={() => setExpanded(false)}
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4" />
            <h3 className="text-sm font-semibold">{t.title}</h3>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="w-6 h-6 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-4">
              <p className="text-sm opacity-80 mb-3">Unable to load weather</p>
              <button
                onClick={fetchWeather}
                className="px-4 py-2 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition-colors"
              >
                {t.refresh}
              </button>
            </div>
          ) : weather ? (
            <>
              <div className="flex items-center gap-4 mb-4">
                <WeatherIcon className="w-16 h-16" />
                <div>
                  <div className="text-4xl font-bold">{weather.temp}°C</div>
                  <div className="text-sm opacity-90">{getTranslatedDescription()}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Thermometer className="w-4 h-4 opacity-70" />
                    <span className="text-xs opacity-70">{t.feelsLike}</span>
                  </div>
                  <div className="text-lg font-semibold">{weather.feelsLike}°C</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Droplets className="w-4 h-4 opacity-70" />
                    <span className="text-xs opacity-70">{t.humidity}</span>
                  </div>
                  <div className="text-lg font-semibold">{weather.humidity}%</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Wind className="w-4 h-4 opacity-70" />
                    <span className="text-xs opacity-70">{t.wind}</span>
                  </div>
                  <div className="text-lg font-semibold">{weather.wind} km/h</div>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Eye className="w-4 h-4 opacity-70" />
                    <span className="text-xs opacity-70">{t.visibility}</span>
                  </div>
                  <div className="text-lg font-semibold">{weather.visibility} km</div>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-3 mb-3">
                <p className="text-sm italic opacity-90">💡 {getActivitySuggestion()}</p>
              </div>

              <button
                onClick={fetchWeather}
                className="w-full py-2 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                {t.refresh}
              </button>
            </>
          ) : null}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WeatherWidget;
