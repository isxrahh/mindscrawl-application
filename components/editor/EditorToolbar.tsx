// src/components/editor/EditorToolbar.tsx
"use client";

import { type Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Highlighter,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Undo,
  Redo,
  Minus,
  Palette,
  Sparkles,
  Baseline,
  Copy,
  Trash,
  Image,
  ChevronDown,
  ImageDownIcon,
  Smile,
  Table,
  Eraser,
  Heading4,
  Heading5,
  Heading6,
  Youtube,
  Subscript,
  Superscript,
  Search,
  Printer,
  Plus,
  MinusIcon,
  PlusIcon,
} from "lucide-react";

import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";

import EmojiPicker from "emoji-picker-react";

interface EditorToolbarProps {
  editor: Editor | null;
  zoom: number;
  setZoom: (zoom: number) => void;
}

const FONT_SIZES = ["12px", "14px", "16px", "18px", "20px", "24px", "30px", "36px"];

export function EditorToolbar({ editor, zoom, setZoom }: EditorToolbarProps) {
  const [linkUrl, setLinkUrl] = useState("");

  if (!editor) return null;
  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };
  const addYoutubeVideo = () => {
    const url = window.prompt("Enter YouTube URL");
    if (url) {
      editor.commands.setYoutubeVideo({ src: url });
    }
  };
  const getCurrentFontSize = () => {
    return editor.getAttributes("textStyle").fontSize || "16px";
  };

  const changeFontSize = (direction: "higher" | "lower") => {
    const current = getCurrentFontSize();
    const currentIndex = FONT_SIZES.indexOf(current);
    
    let nextIndex = direction === "higher" ? currentIndex + 1 : currentIndex - 1;
    
    if (nextIndex >= 0 && nextIndex < FONT_SIZES.length) {
      editor.chain().focus().setFontSize(FONT_SIZES[nextIndex]).run();
    }
  };
  return (
    <div className="sticky top-0 z-10 mb-4 flex flex-wrap items-center gap-1 shadow-sm bg-background p-2 overflow-x-auto">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm">
            <Search className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-3 w-64 space-y-2">
          <Input
            placeholder="Find..."
            onChange={(e) => editor.commands.setSearchTerm(e.target.value)}
          />
          <Input
            placeholder="Replace with..."
            onChange={(e) => editor.commands.setReplaceTerm(e.target.value)}
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1"
              onClick={() => editor.commands.replace()}
            >
              Replace
            </Button>
            <Button
              size="sm"
              className="flex-1"
              onClick={() => editor.commands.replaceAll()}
            >
              All
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      {/* History */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          editor.chain().focus().unsetAllMarks().clearNodes().run()
        }
        className="h-8 text-muted-foreground hover:text-foreground"
      >
        <Eraser className="mr-2 h-4 w-4" />
      </Button>
      <Toggle
        size="sm"
        onPressedChange={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        aria-label="Undo"
      >
        <Undo className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        onPressedChange={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        aria-label="Redo"
      >
        <Redo className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        onPressedChange={() => {
          const text = editor.getText(); // or editor.getHTML()
          navigator.clipboard.writeText(text);
        }}
        aria-label="Copy to clipboard"
      >
        <Copy className="h-4 w-4" />
      </Toggle>
      {/* Zoom Controls */}
      <div className="flex items-center border rounded-md px-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setZoom(Math.max(zoom - 10, 50))}
        >
          <MinusIcon/>
        </Button>
        <span className="text-sm w-8 text-center">{zoom}%</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setZoom(Math.min(zoom + 10, 200))}
        >
          <PlusIcon/>
        </Button>
      </div>

      {/* Print Button */}
      <Button variant="ghost" size="sm" onClick={() => window.print()}>
        <Printer className="h-4 w-4" />
      </Button>
      <Toggle
        size="sm"
        onPressedChange={() => editor.chain().focus().clearContent().run()}
        disabled={!editor.can().clearContent()}
        aria-label="Delete Content"
      >
        <Trash className="h-4 w-4" />
      </Toggle>

      <div className="mx-2 h-6 w-px bg-border" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="w-32 justify-between">
            <span className="truncate text-md">Font family</span>
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {["Inter", "Arial", "Times New Roman", "Courier New"].map((font) => (
            <DropdownMenuItem
              key={font}
              onClick={() => editor.chain().focus().setFontFamily(font).run()}
              className={
                editor.isActive("textStyle", { fontFamily: font })
                  ? "bg-accent"
                  : ""
              }
            >
              {font}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Headings */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="min-w-[90px] justify-between gap-1"
          >
            {editor.isActive("heading", { level: 1 })
              ? "H1"
              : editor.isActive("heading", { level: 2 })
              ? "H2"
              : editor.isActive("heading", { level: 3 })
              ? "H3"
              : editor.isActive("heading", { level: 4 })
              ? "H4"
              : editor.isActive("heading", { level: 5 })
              ? "H5"
              : editor.isActive("heading", { level: 6 })
              ? "H6"
              : "Paragraph"}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={() => editor.chain().focus().setParagraph().run()}
          >
            Paragraph
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading1 className="mr-2 h-4 w-4" /> Heading 1
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 className="mr-2 h-4 w-4" /> Heading 2
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Heading3 className="mr-2 h-4 w-4" /> Heading 3
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 4 }).run()
            }
          >
            <Heading4 className="mr-2 h-4 w-4" /> Heading 4
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 5 }).run()
            }
          >
            <Heading5 className="mr-2 h-4 w-4" /> Heading 5
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 6 }).run()
            }
          >
            <Heading6 className="mr-2 h-4 w-4" /> Heading 6
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="mx-2 h-6 w-px bg-border" />

      {/* Formatting marks */}
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("underline")}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>


      <div className="flex items-center border rounded-md px-1 bg-muted/50">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 w-7 p-0"
          onClick={() => changeFontSize("lower")}
        >
          <Minus className="h-3 w-3" />
        </Button>
        
        <span className="text-md font-medium w-9 text-center">
          {getCurrentFontSize().replace("px", "")}
        </span>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-7 w-7 p-0"
          onClick={() => changeFontSize("higher")}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <div className="mx-1 h-6 w-px bg-border" />
      <Toggle
        size="sm"
        pressed={editor.isActive("code")}
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
      >
        <Code className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("highlight")}
        onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
      >
        <Highlighter className="h-4 w-4" />
      </Toggle>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-1">
            <Baseline className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56">
          <div className="grid grid-cols-6 gap-2 p-2">
            {[
              "#000000",
              "#ffffff",
              "#ef4444",
              "#f59e0b",
              "#84cc16",
              "#06b6d4",
              "#3b82f6",
              "#8b5cf6",
              "#ec4899",
              "#64748b",
              "#9ca3af",
              "#374151",
            ].map((color) => (
              <button
                key={color}
                className="h-8 w-8 rounded-full border border-border shadow-sm hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                type="button"  
                aria-label={`Set text color to ${color}`}  
                title={`Set text color to ${color}`}  
                onClick={() => editor.chain().focus().setColor(color).run()}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <div className="mx-2 h-6 w-px bg-border" />

      {/* Lists & Blocks */}
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("taskList")}
        onPressedChange={() => editor.chain().focus().toggleTaskList().run()}
      >
        <CheckSquare className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-4 w-4" />
      </Toggle>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus className="h-4 w-4" />
      </Button>

      <div className="mx-2 h-6 w-px bg-border" />

      {/* Text Alignment */}
      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: "left" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("left").run()
        }
      >
        <AlignLeft className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: "center" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("center").run()
        }
      >
        <AlignCenter className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: "right" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("right").run()
        }
      >
        <AlignRight className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: "justify" })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign("justify").run()
        }
      >
        <AlignJustify className="h-4 w-4" />
      </Toggle>

      <div className="flex items-center gap-0.5">
        <Toggle
          size="sm"
          pressed={editor.isActive("superscript")}
          onPressedChange={() =>
            editor.chain().focus().toggleSuperscript().run()
          }
        >
          <Superscript className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("subscript")}
          onPressedChange={() => editor.chain().focus().toggleSubscript().run()}
        >
          <Subscript className="h-4 w-4" />
        </Toggle>
      </div>

      
      <div className="mx-2 h-6 w-px bg-border" />

      <Button
        variant="ghost"
        size="sm"
        onClick={addImage}
        className="h-8 w-8 p-0"
      >
        <ImageDownIcon className="h-4 w-4" />
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Smile className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full border-none p-0 shadow-xl"
          align="start"
        >
          <EmojiPicker
            onEmojiClick={(e) =>
              editor.chain().focus().insertContent(e.emoji).run()
            }
          />
        </PopoverContent>
      </Popover>

      
      <div className="mx-2 h-6 w-px bg-border" />

      {/* Link */}
      <Popover>
        <PopoverTrigger asChild>
          <Toggle size="sm" pressed={editor.isActive("link")}>
            <LinkIcon className="h-4 w-4" />
          </Toggle>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-3">
            <Input
              placeholder="Paste or type a link..."
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().unsetLink().run()}
              >
                Remove
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  if (linkUrl.trim()) {
                    editor
                      .chain()
                      .focus()
                      .setLink({ href: linkUrl.trim() })
                      .run();
                  }
                  setLinkUrl("");
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {/* Text Color (simple presets) */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Table className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
          >
            Insert Table
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => editor.chain().focus().addColumnAfter().run()}
          >
            Add Column
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().addRowAfter().run()}
          >
            Add Row
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().deleteTable().run()}
            className="text-destructive"
          >
            Delete Table
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex-1" />
    </div>
  );
}
