"use client";

import type { Note } from "@/lib/types";
import { Plus, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface NoteListProps {
  notes: Note[];
  selectedNoteId: string | null;
  onSelectNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
  onNewNote: () => void;
}

export function NoteList({ notes, selectedNoteId, onSelectNote, onDeleteNote, onNewNote }: NoteListProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-headline text-2xl">My Notes</CardTitle>
        <Button onClick={onNewNote} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </CardHeader>
      <CardContent className="p-0 flex-grow">
        <ScrollArea className="h-[calc(100vh-10rem)]">
          {notes.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              No notes yet. Create one!
            </div>
          ) : (
            <div className="space-y-2 p-4 pt-0">
              {notes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => onSelectNote(note.id)}
                  className={cn(
                    "group flex cursor-pointer items-start justify-between rounded-lg border p-4 transition-colors hover:bg-accent",
                    selectedNoteId === note.id && "bg-primary/80 border-primary-foreground/20 hover:bg-primary"
                  )}
                >
                  <div className="overflow-hidden">
                    <h3 className={cn("font-semibold truncate", selectedNoteId === note.id && "text-primary-foreground")}>{note.title}</h3>
                    <p className={cn("text-sm text-muted-foreground line-clamp-2 mt-1", selectedNoteId === note.id && "text-primary-foreground/80")}>
                      {note.content || "No content"}
                    </p>
                    <p className={cn("text-xs text-muted-foreground mt-2", selectedNoteId === note.id && "text-primary-foreground/60")}>
                      Updated {formatDistanceToNow(note.updatedAt, { addSuffix: true })}
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn("h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100", selectedNoteId === note.id ? "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground" : "text-destructive/80 hover:text-destructive hover:bg-destructive/10")}
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Delete note"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your note titled "{note.title}".
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDeleteNote(note.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
