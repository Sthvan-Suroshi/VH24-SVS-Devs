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
    // Here you would send the feedback to your backend
    setFeedback({ shopkeeper: '', rating: 0, comment: '' });
  };

  const shopkeepers = ['Shop A', 'Shop B', 'Shop C', 'Shop D', 'Shop E'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl transform transition-all hover:scale-105">
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">Shopkeeper Feedback</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Help us improve our service by rating your experience
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={submitFeedback}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="shopkeeper" className="block text-sm font-medium text-gray-700 mb-1">Select Shopkeeper</label>
              <select
                id="shopkeeper"
                name="shopkeeper"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors duration-200"
                value={feedback.shopkeeper}
                onChange={handleInputChange}
              >
                <option value="">Choose a shopkeeper</option>
                {shopkeepers.map((shopkeeper, index) => (
                  <option key={index} value={shopkeeper}>{shopkeeper}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className={`text-4xl focus:outline-none transition-colors duration-200 transform hover:scale-110 ${
                    feedback.rating >= star ? 'text-yellow-400' : 'text-gray-300'
                  }`}
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
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors duration-200"
              placeholder="Share your experience with this shopkeeper..."
              value={feedback.comment}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 transform hover:scale-105"
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