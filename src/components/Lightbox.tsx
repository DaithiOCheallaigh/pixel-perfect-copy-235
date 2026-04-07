import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface LightboxContextType {
  open: (src: string, alt: string) => void;
}

const LightboxContext = createContext<LightboxContextType | null>(null);

export const useLightbox = () => useContext(LightboxContext);

export const LightboxProvider = ({ children }: { children: ReactNode }) => {
  const [image, setImage] = useState<{ src: string; alt: string } | null>(null);

  const open = useCallback((src: string, alt: string) => {
    setImage({ src, alt });
  }, []);

  const close = useCallback(() => setImage(null), []);

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X className="h-8 w-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={image.src}
              alt={image.alt}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
};

/** Drop-in replacement for <img> that opens in a lightbox on click */
export const LightboxImage = ({
  src,
  alt,
  className,
  loading,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const lightbox = useLightbox();

  return (
    <img
      src={src}
      alt={alt || ""}
      className={`${className || ""} cursor-zoom-in`}
      loading={loading}
      onClick={(e) => {
        e.stopPropagation();
        if (src && lightbox) lightbox.open(src, alt || "");
      }}
      {...props}
    />
  );
};
