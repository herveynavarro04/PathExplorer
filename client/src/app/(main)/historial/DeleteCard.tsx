import React, { useState } from "react";

interface DeleteCardProps {
  historyId: number;
  setOpendDeleteCard: (open: boolean) => void;
  setHistoryArray: React.Dispatch<React.SetStateAction<any[]>>;
}

const DeleteCard: React.FC<DeleteCardProps> = ({ historyId, setOpendDeleteCard, setHistoryArray }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const simulateDelete = async () => {
    setIsDeleting(true);
    setError(null);
    
    try {
     

      setHistoryArray((prevHistory) =>
        prevHistory.filter((historyItem) => historyItem.id !== historyId)
      );

      setOpendDeleteCard(false);
    } catch (err) {
      setError("An error occurred while deleting. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md max-w-sm w-full">
        <h2 className="text-xl font-semibold text-center">Are you sure you want to delete this entry?</h2>
        
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
            onClick={() => setOpendDeleteCard(false)} 
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md"
            onClick={simulateDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCard;

