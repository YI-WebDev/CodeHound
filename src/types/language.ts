// 言語データの型定義
export interface Language {
    id: string;
    name: string;
    bgColor: string;
    textColor: string;
}

export const languages: Language[] = [
    {
        id: "python",
        name: "Python",
        bgColor: "bg-blue-500",
        textColor: "text-white"
    },
    {
        id: "javascript",
        name: "JavaScript",
        bgColor: "bg-yellow-400",
        textColor: "text-black"
    },
    {
        id: "typescript",
        name: "TypeScript",
        bgColor: "bg-blue-600",
        textColor: "text-white"
    },
    {
        id: "c#",
        name: "C#",
        bgColor: "bg-purple-700",
        textColor: "text-white"
    },
    {
        id: "c++",
        name: "C++",
        bgColor: "bg-blue-700",
        textColor: "text-white"
    },
    {
        id: "java",
        name: "Java",
        bgColor: "bg-orange-600",
        textColor: "text-white"
    },
    {
        id: "go",
        name: "Go",
        bgColor: "bg-sky-500",
        textColor: "text-white"
    },
    {
        id: "rust",
        name: "Rust",
        bgColor: "bg-amber-700",
        textColor: "text-white"
    },
    {
        id: "swift",
        name: "Swift",
        bgColor: "bg-orange-500",
        textColor: "text-white"
    },
    {
        id: "kotlin",
        name: "Kotlin",
        bgColor: "bg-violet-600",
        textColor: "text-white"
    },
    {
        id: "php",
        name: "PHP",
        bgColor: "bg-indigo-400",
        textColor: "text-white"
    },
    {
        id: "ruby",
        name: "Ruby",
        bgColor: "bg-red-600",
        textColor: "text-white"
    },
];