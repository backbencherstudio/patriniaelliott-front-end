"use client";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import { useMemo } from "react";

// Dynamically import JoditEditor to avoid SSR issues
const JoditEditor = dynamic(() => import("jodit-react"), { 
  ssr: false,
  loading: () => <div className="h-[200px] border rounded-md p-4">Loading editor...</div>
});

interface CreateBlogProps {
  content: string;
  onContentChange: (content: string) => void;
  title?: string;
  subtitle?: string;
}

const CreateBlog = ({ content, onContentChange,title,subtitle }: CreateBlogProps) => {
  // Fixed config with proper TypeScript types
  const config = useMemo(() => ({
    readonly: false,
    height: 200,
    enableDragAndDropFileToEditor: true,
    showXPathInStatusbar: false,
    showBrowserColorPicker: false,
    showCharsCounter: false,
    showWordsCounter: false,
    statusbar: false,
    enter: "p" as const,
    cleanHTML: {
      fillEmptyParagraph: true,
    },
    list: {
      indent: 20,
    },
    uploader: {
      insertImageAsBase64URI: true,
      imagesExtensions: ["jpg", "png", "jpeg", "gif"],
      maximumImageFileSize: 1000000,
    },
    buttons: [
      "source", "|", "bold", "italic", "underline", "strikethrough", "|",
      "ul", "ol", "|", "paragraph", "fontsize", "brush", "|", 
      "image", "link", "|", "align", "|", "undo", "redo",
    ],
  }), []);

  return (
    <div className="bg-white rounded-lg">
      <div className="flex items-center h-full justify-between mb-2">
        {title&&<h2 className="text-[20px] capitalize lg:text-2xl font-semibold text-headerColor">
          {title}
        </h2>}
      </div>

      {/* Blog Content (Jodit Editor) */}
      <div className="">
        {subtitle&&<Label className="text-base font-semibold text-headerColor mb-2">
          {subtitle}
        </Label>}
        <JoditEditor
          value={content}
          config={config}
          onBlur={onContentChange}
        />
      </div>
    </div>
  );
};

export default CreateBlog;