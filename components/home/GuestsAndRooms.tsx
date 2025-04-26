'use client';

import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

type Room = {
  id: number;
  adults: number;
  children: number;
};
export default function GuestsAndRooms() {
  const [rooms, setRooms] = useState<Room[]>([
    { id: 1, adults: 2, children: 0 },
  ]);
  const handleChange = (
    index: number,
    type: 'adults' | 'children',
    action: 'increment' | 'decrement'
  ) => {
    setRooms((prev) =>
      prev.map((room, i) =>
        i === index
          ? {
              ...room,
              [type]:
                action === 'increment'
                  ? room[type] + 1
                  : Math.max(room[type] - 1, type === 'adults' ? 1 : 0),
            }
          : room
      )
    );
  };
  const addRoom = () => {
    setRooms((prev) => [
      ...prev,
      { id: prev.length + 1, adults: 2, children: 0 },
    ]);
  };
  return (
    <div className="w-[300px] p-4">
      <h3 className="text-lg font-semibold text-black mb-1">Guests and Rooms</h3>
      <p className="text-sm text-muted-foreground mb-4">Choose your guest and rooms</p>
      {rooms.map((room, index) => (
        <div
          key={room.id}
          className="border border-yellow-400 rounded-lg p-4 mb-4"
        >
          <div className="flex justify-between items-center text-sm font-semibold mb-3">
            <p>Room {room.id}</p>
            <span className="text-gray-700">
              {room.adults} Adult{room.adults > 1 ? 's' : ''}, {room.children} Child
            </span>
          </div>
          {/* Adults */}
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-sm font-medium text-black">Adults</p>
              <p className="text-xs text-muted-foreground">15+ years</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleChange(index, 'adults', 'decrement')}
                className="rounded-full border-gray-300 text-black"
              >
                <Minus size={16} />
              </Button>
              <span className="w-4 text-center text-sm">{room.adults}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleChange(index, 'adults', 'increment')}
                className="rounded-full border-gray-300 text-black"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
          {/* Children */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-black">Children</p>
              <p className="text-xs text-muted-foreground">1-9 years</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleChange(index, 'children', 'decrement')}
                className="rounded-full border-gray-300 text-black"
              >
                <Minus size={16} />
              </Button>
              <span className="w-4 text-center text-sm">{room.children}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleChange(index, 'children', 'increment')}
                className="rounded-full border-gray-300 text-black"
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
        </div>
      ))}
      {/* Add Room */}
      <Button
        onClick={addRoom}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-sm rounded-md"
      >
        <Plus className="mr-2 h-4 w-4" /> Add another Room
      </Button>
    </div>
  );
}
