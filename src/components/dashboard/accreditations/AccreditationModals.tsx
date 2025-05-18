"use client";

import { AddAccreditationModal } from "./AddAccreditationModal";
import { AddMultipleAccreditationsModal } from "./AddMultipleAccreditationsModal";

export function AccreditationModals() {
  return (
    <div className="flex items-center gap-2">
      <AddAccreditationModal />
      <AddMultipleAccreditationsModal />
    </div>
  );
}
