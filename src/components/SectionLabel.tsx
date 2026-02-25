const SectionLabel = ({ children }: { children: string }) => (
  <div className="mb-8 flex items-center gap-4">
    <div className="h-[1px] w-6 bg-primary" />
    <span className="font-mono-label text-muted-foreground">{children}</span>
  </div>
);

export default SectionLabel;
