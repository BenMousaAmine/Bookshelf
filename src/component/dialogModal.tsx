import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

interface DialogProps {
  title: string;
  text: string;
  open: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'xs';
  onClose: () => void;
  onConfirm: () => void;
}

const DialogModal: React.FC<DialogProps> = ({
  title,
  text,
  open,
  size = 'xs',
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} size={size} handler={onClose}>
      <DialogHeader>{title}</DialogHeader>
      <DialogBody>{text}</DialogBody>
      <DialogFooter>
        <Button variant="outlined" onClick={onClose} className="mr-1">
          Cancel
        </Button>
        <Button variant="gradient" onClick={onConfirm}>
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DialogModal;
