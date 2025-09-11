'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Heading3
} from 'lucide-react';
import { useCallback, useState, useEffect } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

/**
 * Rich text editor component using Tiptap
 */
export default function RichTextEditor({ 
  content, 
  onChange, 
  placeholder = "Start writing your blog post..." 
}: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline hover:text-blue-800',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[300px] p-4',
      },
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addLink = useCallback(() => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  if (!isMounted || !editor) {
    return (
      <div className="border border-gray-300 rounded-lg overflow-hidden dark:border-gray-600">
        <div className="bg-gray-50 border-b border-gray-300 p-2 dark:bg-gray-700 dark:border-gray-600">
          <div className="h-10 bg-gray-200 rounded animate-pulse dark:bg-gray-600"></div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4">
          <div className="h-64 bg-gray-100 rounded animate-pulse dark:bg-gray-700"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden dark:border-gray-600">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1 dark:bg-gray-700 dark:border-gray-600">
        {/* Text formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded transition-colors ${
            editor.isActive('bold')
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-600 dark:text-gray-200'
          }`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded transition-colors ${
            editor.isActive('italic')
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-600 dark:text-gray-200'
          }`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>

        {/* Headings */}
        <div className="border-l border-gray-300 mx-1 dark:border-gray-600"></div>
        
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded transition-colors ${
            editor.isActive('heading', { level: 1 })
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-600 dark:text-gray-200'
          }`}
          title="Heading 1"
        >
          <Heading1 className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded transition-colors ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-600 dark:text-gray-200'
          }`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded transition-colors ${
            editor.isActive('heading', { level: 3 })
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-600 dark:text-gray-200'
          }`}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        {/* Lists */}
        <div className="border-l border-gray-300 mx-1 dark:border-gray-600"></div>
        
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded transition-colors ${
            editor.isActive('bulletList')
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-600 dark:text-gray-200'
          }`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded transition-colors ${
            editor.isActive('orderedList')
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-600 dark:text-gray-200'
          }`}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded transition-colors ${
            editor.isActive('blockquote')
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-600 dark:text-gray-200'
          }`}
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </button>

        {/* Links and Images */}
        <div className="border-l border-gray-300 mx-1 dark:border-gray-600"></div>
        
        <button
          onClick={addLink}
          className="p-2 rounded bg-white text-gray-700 hover:bg-gray-100 transition-colors dark:bg-gray-600 dark:text-gray-200"
          title="Add Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>
        
        <button
          onClick={addImage}
          className="p-2 rounded bg-white text-gray-700 hover:bg-gray-100 transition-colors dark:bg-gray-600 dark:text-gray-200"
          title="Add Image"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        {/* Undo/Redo */}
        <div className="border-l border-gray-300 mx-1 dark:border-gray-600"></div>
        
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 rounded bg-white text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-600 dark:text-gray-200"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 rounded bg-white text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-600 dark:text-gray-200"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>

      {/* Editor Content */}
      <div className="bg-white dark:bg-gray-800">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
