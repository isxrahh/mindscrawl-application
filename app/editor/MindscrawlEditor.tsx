"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {Table} from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Underline from "@tiptap/extension-underline";
import {TextStyle} from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { TaskList, TaskItem } from "@tiptap/extension-list";
import { EditorToolbar } from "@/components/editor/EditorToolbar";
import { cn } from "@/lib/utils";

import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Youtube from "@tiptap/extension-youtube";
import CharacterCount from "@tiptap/extension-character-count";
import Typography from "@tiptap/extension-typography";
import { useState } from "react";
import FontFamily from '@tiptap/extension-font-family';
import { SearchAndReplace } from '@sereneinserenade/tiptap-search-and-replace';

import { Extension } from '@tiptap/core'
import '@tiptap/extension-text-style'


export const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() {
    return {
      types: ['textStyle'],
    }
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.fontSize) return {}
              return { style: `font-size: ${attributes.fontSize}` }
            },
          },
        },
      },
    ]
  },
  addCommands() {
    return {
      setFontSize: fontSize => ({ chain }) => {
        return chain().setMark('textStyle', { fontSize }).run()
      },
      unsetFontSize: () => ({ chain }) => {
        return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run()
      },
    }
  },
})

const extensions = [
  StarterKit.configure({
    heading: { levels: [1, 2, 3] },
  }),
  FontFamily,
  SearchAndReplace,
  TextStyle,
  Color.configure({ types: ["textStyle"] }),
  Highlight.configure({ multicolor: true }),
  Underline,
  Link.configure({ openOnClick: false }),
  Image.configure({ allowBase64: true }),
  TextAlign.configure({ types: ["heading", "paragraph", "image"] }),
  Table.configure({ resizable: true }),
  TableRow,
  TableHeader,
  TableCell,
  TaskList,
  TaskItem.configure({ nested: true }),
  Placeholder.configure({
    placeholder: "Type '/' for commands or start writing...",
  }),
  Subscript,
  Superscript,
  Typography,
  FontSize,
  TextStyle,
  Youtube.configure({
    width: 480,
    height: 320,
  }),
  CharacterCount.configure({
    limit: 10000,
  }),
];


export function MindscrawlEditor() {
  const [zoom, setZoom] = useState(100); // Zoom state

  const editor = useEditor({
    extensions,
    content: "<h2>My New Page</h2><p>Start typing here...</p>",
    editorProps: {
      attributes: {
        class: cn("prose prose-lg dark:prose-invert max-w-none focus:outline-none min-h-[500px] p-4"),
      },
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
    <EditorToolbar editor={editor} zoom={zoom} setZoom={setZoom} />
      <div 
        className="flex-1 overflow-auto p-8 bg-muted/30"
        style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
      >
        <div className="max-w-4xl mx-auto bg-card shadow-sm border p-12 min-h-[1056px]">
          <EditorContent editor={editor} />
        </div>
      </div>
      <div className="flex justify-between items-center border-t bg-muted/10 px-4 py-2 text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
        <div>{editor.storage.characterCount.words()} words</div>
        <div>{editor.storage.characterCount.characters()} / 10,000 characters</div>
      </div>
    </div>
  );
}