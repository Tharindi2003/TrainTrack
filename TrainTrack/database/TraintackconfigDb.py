import sqlite3
import os

db_path = 'TrainTrack.db'

if os.path.exists(db_path):
    try:
        # Connect to database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        print("Database connection successful!")
        
         
        # Close the connection
        cursor.close()
        conn.close()
        print("Database connection closed.")
        
    except sqlite3.Error as e:
        print(f"Database connection failed: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")
else:
    print("Database file not found. Creating new database...")
    
    try:
        # Create new database
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        print("New database created successfully!")
        
        # Create tables
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS trains (
            train_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            source TEXT NOT NULL,
            destination TEXT NOT NULL,
            date TEXT NOT NULL,
            time TEXT NOT NULL
        );
        """)
        
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS seats (
            seat_id INTEGER PRIMARY KEY AUTOINCREMENT,
            train_id INTEGER NOT NULL,
            status TEXT DEFAULT 'Available',
            FOREIGN KEY (train_id) REFERENCES trains (train_id)
        );
        """)
        
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS bookings (
            booking_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT NOT NULL,
            train_id INTEGER NOT NULL,
            seat_id INTEGER NOT NULL,
            date TEXT NOT NULL,
            FOREIGN KEY (train_id) REFERENCES trains (train_id),
            FOREIGN KEY (seat_id) REFERENCES seats (seat_id)
        );
        """)
        
        conn.commit()
        print("Tables created successfully!")
        
        # Close the connection
        cursor.close()
        conn.close()
        print("Database connection closed.")
        
    except sqlite3.Error as e:
        print(f"Database creation failed: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")