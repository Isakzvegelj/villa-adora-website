'use client'

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Trash2, Wifi, WifiOff, RotateCcw } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number // store as number for JSON serialization
  failed?: boolean
}

const CHAT_STORAGE_KEY = 'villa-adora-chat-history'
const BOT_API = 'https://villa-adora-bot-r00l.onrender.com/api/chat'

const createWelcomeMessage = (): Message => ({
  id: 'welcome',
  role: 'assistant',
  content: 'Hello! I\'m the Villa Adora concierge. How can I help you today? I can assist with room bookings, local recommendations, dining reservations, and more.',
  timestamp: Date.now(),
})

const SUGGESTIONS = [
  'Tell me about your suites',
  'What\'s the best time to visit Bled?',
  'How do I make a reservation?',
  'What activities are nearby?',
]

// Check if the bot API is reachable
async function checkBotHealth(): Promise<boolean> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)
    const res = await fetch('https://villa-adora-bot-r00l.onrender.com/', {
      method: 'HEAD',
      signal: controller.signal,
    })
    clearTimeout(timeout)
    return res.ok || res.status < 500
  } catch {
    return false
  }
}

function loadMessages(): Message[] {
  try {
    const stored = localStorage.getItem(CHAT_STORAGE_KEY)
    if (stored) {
      const parsed: Message[] = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch {
    // ignore parse errors
  }
  return [createWelcomeMessage()]
}

function saveMessages(messages: Message[]) {
  try {
    // Keep last 50 messages to avoid localStorage bloat
    const toStore = messages.slice(-50)
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(toStore))
  } catch {
    // ignore storage errors
  }
}

export default function ConciergeWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(loadMessages)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // Persist messages to localStorage whenever they change
  useEffect(() => {
    saveMessages(messages)
  }, [messages])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  // Check bot health periodically and on open
  useEffect(() => {
    if (!isOpen) return
    let cancelled = false
    const check = async () => {
      const healthy = await checkBotHealth()
      if (!cancelled) setIsOnline(healthy)
    }
    check()
    const interval = setInterval(check, 30000) // check every 30s
    return () => { cancelled = true; clearInterval(interval) }
  }, [isOpen])

  const clearChat = useCallback(() => {
    const welcome = createWelcomeMessage()
    setMessages([welcome])
    localStorage.removeItem(CHAT_STORAGE_KEY)
    setLastFailedMessage(null)
  }, [])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: Date.now(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setIsTyping(true)
    setLastFailedMessage(null)

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 15000) // 15s timeout

      const response = await fetch(BOT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim() }),
        signal: controller.signal,
      })
      clearTimeout(timeout)

      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      const data = await response.json()

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.response || data.message || 'I apologize, but I\'m having trouble connecting right now. Please try again or contact us directly at +386 4 574 10 00.',
        timestamp: Date.now(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      setLastFailedMessage(text.trim())
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'I\'m sorry, I\'m having trouble connecting right now. Please try again later or contact us directly at info@villa-adora-bled.si.',
        timestamp: Date.now(),
        failed: true,
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  const retryLastMessage = () => {
    if (lastFailedMessage) {
      // Remove the last error message
      setMessages(prev => prev.slice(0, -1))
      sendMessage(lastFailedMessage)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleSuggestion = (suggestion: string) => {
    sendMessage(suggestion)
  }

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-shadow"
            aria-label="Open concierge chat"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Villa Adora Concierge</h3>
                  <p className="text-white/70 text-xs flex items-center gap-1">
                    {isOnline ? (
                      <><Wifi className="w-3 h-3" /><span className="w-2 h-2 rounded-full inline-block bg-green-400" />Online</>
                    ) : (
                      <><WifiOff className="w-3 h-3" /><span className="w-2 h-2 rounded-full inline-block bg-yellow-400" />Connecting...</>
                    )}
                    {isTyping && <span className="ml-1 animate-pulse">· Typing...</span>}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 1 && (
                  <button
                    onClick={clearChat}
                    className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label="Clear chat history"
                    title="Clear chat"
                  >
                    <Trash2 className="h-4 w-4 text-white/70 hover:text-white" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {/* Offline warning banner */}
              {!isOnline && (
                <motion.div
                  initial={{ opacity:0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 flex items-center gap-2 text-xs text-amber-700"
                >
                  <WifiOff className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Bot may be offline. Messages will be retried automatically.</span>
                </motion.div>
              )}
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="h-4 w-4 text-indigo-600" />
                    </div>
                  )}
                  <div className={`max-w-[80%] ${message.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        message.role === 'user'
                          ? 'bg-indigo-600 text-white rounded-br-md'
                          : message.failed
                            ? 'bg-red-50 text-red-800 shadow-sm border border-red-200 rounded-bl-md'
                            : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md'
                      }`}
                    >
                      {message.content}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] text-gray-400 px-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {message.failed && (
                        <button
                          onClick={retryLastMessage}
                          className="text-[10px] text-red-500 hover:text-red-700 flex items-center gap-0.5 px-1"
                          title="Retry"
                        >
                          <RotateCcw className="w-3 h-3" /> Retry
                        </button>
                      )}
                    </div>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator with animated dots */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 items-start"
                >
                  <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100 flex items-center gap-1">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}

              {/* Suggestions */}
              {messages.length <= 1 && !isTyping && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTIONS.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestion(suggestion)}
                      className="px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 text-xs rounded-full hover:bg-indigo-50 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-white flex-shrink-0">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
