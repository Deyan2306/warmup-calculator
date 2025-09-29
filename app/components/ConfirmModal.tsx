"use client";
import { FC, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 max-w-sm w-full shadow-2xl"
      >
        <p className="text-neutral-300 mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="bg-neutral-800 text-amber-400 border hover:cursor-pointer hover:bg-neutral-700 hover:text-amber-400 border-neutral-700"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-amber-400 text-neutral-900 border border-amber-400 hover:cursor-pointer hover:text-amber-400 hover:bg-neutral-800"
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
