import React, { useState } from 'react';
import { Plus, Trash2, Edit, Check, X } from 'lucide-react';
import { Section } from '../types';
import { motion } from 'framer-motion';

interface SectionListProps {
  sections: Section[];
  activeSection: string;
  setActiveSection: (id: string) => void;
  addSection: (name: string) => void;
  deleteSection: (id: string) => void;
  editSection: (id: string, newName: string) => void;
}

const SectionList: React.FC<SectionListProps> = ({
  sections,
  activeSection,
  setActiveSection,
  addSection,
  deleteSection,
  editSection,
}) => {
  const [newSectionName, setNewSectionName] = useState('');
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editedSectionName, setEditedSectionName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSectionName.trim()) {
      addSection(newSectionName.trim());
      setNewSectionName('');
    }
  };

  const handleEditSubmit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    if (editedSectionName.trim()) {
      editSection(id, editedSectionName.trim());
      setEditingSectionId(null);
    }
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Sections</h3>
      <ul className="space-y-2 mb-4">
        {sections.map((section) => (
          <motion.li
            key={section.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`group relative rounded-xl transition-all duration-200 ${
              activeSection === section.id
                ? 'bg-violet-100 dark:bg-violet-900/50 text-violet-900 dark:text-violet-100'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-200'
            }`}
          >
            {editingSectionId === section.id ? (
              <form onSubmit={(e) => handleEditSubmit(e, section.id)} className="flex p-2">
                <input
                  type="text"
                  value={editedSectionName}
                  onChange={(e) => setEditedSectionName(e.target.value)}
                  className="flex-1 px-3 py-1 bg-white dark:bg-gray-700 border border-violet-200 dark:border-violet-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-white"
                  autoFocus
                />
                <div className="flex ml-2">
                  <button type="submit" className="p-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
                    <Check size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingSectionId(null)}
                    className="p-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                  >
                    <X size={18} />
                  </button>
                </div>
              </form>
            ) : (
              <div
                onClick={() => setActiveSection(section.id)}
                className="flex items-center justify-between p-3 cursor-pointer"
              >
                <span className="font-medium">{section.name}</span>
                {section.id !== 'default' && (
                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingSectionId(section.id);
                        setEditedSectionName(section.name);
                      }}
                      className="p-1 text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 rounded-lg"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSection(section.id);
                      }}
                      className="p-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={newSectionName}
          onChange={(e) => setNewSectionName(e.target.value)}
          placeholder="New section..."
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent dark:text-white dark:placeholder-gray-400"
        />
        <button
          type="submit"
          className="absolute right-2 p-2 bg-violet-500 dark:bg-violet-600 text-white rounded-lg hover:bg-violet-600 dark:hover:bg-violet-700 transition-colors duration-200"
        >
          <Plus size={20} />
        </button>
      </form>
    </div>
  );
};

export default SectionList;