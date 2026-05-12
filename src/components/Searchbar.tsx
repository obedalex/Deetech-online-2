import { Search, CircleX } from "lucide-react";

const Searchbar = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2 px-2 py-1 bg-background/50 border border-border rounded-md">
      <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        placeholder="Search products..."
        className="bg-transparent outline-none text-sm flex-1"
      />

      {value && (
        <CircleX
          onClick={() => onChange("")}
          className="w-3.5 h-3.5 text-muted-foreground shrink-0 cursor-pointer"
        />
      )}
    </div>
  );
};

export default Searchbar;
