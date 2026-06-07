import React from 'react';
import { motion } from 'framer-motion';

const reviews = [
    {
        id: 1,
        name: "Sarah Jenkins",
        location: "United Kingdom",
        rating: 5,
        text: "An absolutely magical stay. The views of Lake Bled were breathtaking, and the service was impeccable.",
        date: "September 2023"
    },
    {
        id: 2,
        name: "Marc Dubois",
        location: "France",
        rating: 5,
        text: "Luxury at its finest. The attention to detail in the rooms and the breakfast service was outstanding.",
        date: "August 2023"
    },
    {
        id: 3,
        name: "Elena Rossi",
        location: "Italy",
        rating: 5,
        text: "Perfect location, beautiful villa, and wonderful hosts. We will definitely be coming back.",
        date: "July 2023"
    }
];

const ReviewsPreview: React.FC = () => {
    return (
        <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white mb-4">
                        Guest Experiences
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Read what our guests have to say about their stay at Villa Adora.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex gap-1 mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <span key={i} className="text-yellow-400">★</span>
                                ))}
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                                "{review.text}"
                            </p>
                            <div className="flex justify-between items-end">
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                        {review.name}
                                    </h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {review.location}
                                    </p>
                                </div>
                                <span className="text-xs text-gray-400">
                                    {review.date}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewsPreview;
