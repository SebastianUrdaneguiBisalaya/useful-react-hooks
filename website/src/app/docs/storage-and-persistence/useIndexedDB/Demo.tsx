'use client';

import { useState, useEffect, useCallback } from "react";
import { useIndexedDB } from "../../../../../../src";
import LayoutDemo from "@/layouts/LayoutDemo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export interface Note {
  id?: number;
  text: string;
  createdAt: number;
}

export default function Demo() {
  const db = useIndexedDB({
    name: 'notes-db',
    version: 1,
    onUpgrade(db) {
      if (!db.objectStoreNames.contains('notes')) {
        db.createObjectStore('notes', {
          keyPath: 'id',
          autoIncrement: true,
        })
      }
    }
  });

  const [notes, setNotes] = useState<Note[]>([]);
  const [text, setText] = useState<string>('');

  const loadNotes = useCallback(async () => {
    const result = await db.withStore('notes', store => {
      return new Promise<Note[]>(resolve => {
        const request = store.getAll();
        request.onsuccess = () => {
          resolve(request.result);
        };
      });
    })
    setNotes(result.reverse());
  }, [db]);

  const addNote = async () => {
    if (!text.trim()) return;
    await db.withStore('notes', store => {
      store.add({ text, createdAt: Date.now() });
      return Promise.resolve();
    });
    setText('');
    loadNotes();
  }

  useEffect(() => {
    setTimeout(() => {
      loadNotes();
    }, 100);
  }, [loadNotes]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }

  return (
    <LayoutDemo
      title="IndexedDB"
    >
      <div className="w-full flex flex-row items-center gap-4">
        <Input.Primary
          value={text}
          onChange={handleOnChange}
          placeholder="Write something here"
        />
        <Button.Primary
          onClick={addNote}
        >
          Save
        </Button.Primary>
      </div>
      <div>
        <ul className="">
          {notes.map(note => (
            <li
              className="font-reddit-sans text-sm text-white"
              key={note.id}
            >
              {note.text}
            </li>
          ))}
        </ul>
      </div>
    </LayoutDemo>
  )
}
