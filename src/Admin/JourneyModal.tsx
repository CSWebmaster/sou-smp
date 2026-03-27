import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

interface JourneyModalProps {
  journey?: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function JourneyModal({ journey, isOpen, onClose, onSave }: JourneyModalProps) {
  const [title, setTitle] = useState(journey?.title || '');
  const [description, setDescription] = useState(journey?.description || '');
  const [imageUrl, setImageUrl] = useState(journey?.imageUrl || '');
  const [order, setOrder] = useState(journey?.order || 0);

  const handleSubmit = async () => {
    const journeyData = {
      title,
      description,
      imageUrl,
      order: parseInt(order.toString())
    };

    try {
      if (journey?.id) {
        // Update existing
        await updateDoc(doc(db, 'journey', journey.id), journeyData);
      } else {
        // Create new
        await addDoc(collection(db, 'journey'), journeyData);
      }
      onSave(journeyData);
      onClose();
    } catch (error) {
      console.error('Error saving journey:', error);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {journey ? 'Edit Journey Item' : 'Add Journey Item'}
        </h2>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows={4}
          />

          <input
            type="url"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />

          <input
            type="number"
            placeholder="Order"
            value={order}
            onChange={(e) => setOrder(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  ) : null;
}