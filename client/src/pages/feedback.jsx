import React, { useState } from 'react';

const Feedback = () => {
  const [feedback, setFeedback] = useState({
    shopkeeper: '',
    rating: 0,
    comment: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setFeedback(prev => ({ ...prev, rating }));
  };

  const submitFeedback = (e) => {
    e.preventDefault();
    console.log('Submitting feedback:', feedback);
    setFeedback({ shopkeeper: '', rating: 0, comment: '' });
  };

  const shopkeepers = ['Shop A', 'Shop B', 'Shop C', 'Shop D', 'Shop E'];

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <div>
          <h2 className="text-center text-4xl font-bold text-gray-900">Shopkeeper Feedback</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Help us improve our service by rating your experience
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={submitFeedback}>
          <div className="mb-4">
            <label htmlFor="shopkeeper" className="block text-sm font-medium text-gray-700 mb-1">Select Shopkeeper</label>
            <select
              id="shopkeeper"
              name="shopkeeper"
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              value={feedback.shopkeeper}
              onChange={handleInputChange}
            >
              <option value="">Choose a shopkeeper</option>
              {shopkeepers.map((shopkeeper, index) => (
                <option key={index} value={shopkeeper}>{shopkeeper}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className={`text-5xl focus:outline-none transition-colors duration-200 ${feedback.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Your Feedback</label>
            <textarea
              id="comment"
              name="comment"
              rows="4"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              placeholder="Share your experience with this shopkeeper..."
              value={feedback.comment}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
            >
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
