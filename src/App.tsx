import { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import './App.css';

type WorkoutEntry = {
  id: number;
  date: string;
  type: 'Horse Riding' | 'Running' | 'Gym';
  duration: number;
  details: {
    horseName?: string;
    distance?: number;
    exercises?: Array<{
      name: string;
      weight: number;
      reps: number;
      sets: number;
    }>;
  };
  notes: string;
};

const initialWorkouts: WorkoutEntry[] = [
  {
    id: 1,
    date: '2024-03-20',
    type: 'Horse Riding',
    duration: 45,
    details: {
      horseName: 'Soky',
      distance: 5,
    },
    notes: 'Great session, worked on posture',
  },
  {
    id: 2,
    date: '2024-03-20',
    type: 'Gym',
    duration: 60,
    details: {
      exercises: [
        { name: 'Squats', weight: 15, reps: 8, sets: 3 },
        { name: 'Deadlifts', weight: 20, reps: 6, sets: 3 },
      ],
    },
    notes: 'Feeling stronger!',
  },
  {
    id: 3,
    date: '2024-03-21',
    type: 'Running',
    duration: 25,
    details: {
      distance: 2.5,
    },
    notes: 'First proper run! Took it easy',
  },
  {
    id: 4,
    date: '2024-03-22',
    type: 'Horse Riding',
    duration: 50,
    details: {
      horseName: 'Soky',
      distance: 6,
    },
    notes: 'Improved trotting technique',
  },
  {
    id: 5,
    date: '2024-03-23',
    type: 'Gym',
    duration: 65,
    details: {
      exercises: [
        { name: 'Squats', weight: 17.5, reps: 8, sets: 3 },
        { name: 'Deadlifts', weight: 22.5, reps: 6, sets: 3 },
        { name: 'Push-ups', weight: 0, reps: 5, sets: 2 },
      ],
    },
    notes: 'Added push-ups! Increased weights slightly',
  },
  {
    id: 6,
    date: '2024-03-24',
    type: 'Running',
    duration: 28,
    details: {
      distance: 2.7,
    },
    notes: 'Felt easier than first run',
  },
  {
    id: 7,
    date: '2024-03-25',
    type: 'Horse Riding',
    duration: 55,
    details: {
      horseName: 'Soky',
      distance: 6.5,
    },
    notes: 'Practiced jumping, getting more confident',
  },
  {
    id: 8,
    date: '2024-03-26',
    type: 'Gym',
    duration: 70,
    details: {
      exercises: [
        { name: 'Squats', weight: 20, reps: 8, sets: 3 },
        { name: 'Deadlifts', weight: 25, reps: 6, sets: 3 },
        { name: 'Push-ups', weight: 0, reps: 6, sets: 2 },
        { name: 'Dumbbell Rows', weight: 8, reps: 8, sets: 2 },
      ],
    },
    notes: 'Added rows! Getting stronger 💪',
  },
];

function App() {
  const [workouts, setWorkouts] = useState<WorkoutEntry[]>(initialWorkouts);
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Update window dimensions
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);

    // Hide confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="app">
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          colors={['#ff69b4', '#ffb6c1', '#ffe4e1', '#fff']}
          recycle={false}
        />
      )}
      <h1>My Fitness Journey 💪</h1>
      <table className="workout-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Duration (min)</th>
            <th>Details</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout.id}>
              <td>{workout.date}</td>
              <td>{workout.type}</td>
              <td>{workout.duration}</td>
              <td>
                {workout.type === 'Horse Riding' && (
                  <>
                    Horse: {workout.details.horseName} - {workout.details.distance}km
                  </>
                )}
                {workout.type === 'Gym' && (
                  <ul>
                    {workout.details.exercises?.map((exercise, idx) => (
                      <li key={idx}>
                        {exercise.name}: {exercise.weight}kg x {exercise.reps} x {exercise.sets}
                      </li>
                    ))}
                  </ul>
                )}
              </td>
              <td>{workout.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
