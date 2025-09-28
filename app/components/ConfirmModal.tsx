"use client";
import { FC } from "react";
import { Button } from "@/components/ui/button";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 max-w-sm w-full shadow-2xl">
        <p className="text-neutral-300 mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="bg-neutral-800 text-amber-400 border border-neutral-700"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-amber-400 text-neutral-900 border border-amber-400"
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
