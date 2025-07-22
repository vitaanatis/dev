

<!DOCTYPE html>
<html>
<head>
    <title>Synced Clicker</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #000000; /* Black background */
            color: #FFD700; /* Deep Yellow text */
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
            box-sizing: border-box;
            position: relative;
        }
        .container {
            background-color: #1a1a1a; /* Darker black for container */
            border-radius: 1rem;
            box-shadow: 0 10px 15px rgba(255, 215, 0, 0.2); /* Yellow shadow */
            padding: 2.5rem;
            text-align: center;
            max-width: 90%;
            width: 500px;
            border: 2px solid #FFD700; /* Yellow border */
        }
        .click-button {
            background-color: #FFD700; /* Deep Yellow button */
            color: #000000; /* Black emoji */
            border: none;
            border-radius: 50%;
            width: 200px;
            height: 200px;
            font-size: 8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
            margin: 0 auto 2rem auto;
            box-shadow: 0 8px 16px rgba(255, 215, 0, 0.3);
        }
        .click-button:hover {
            background-color: #E0B500; /* Slightly darker yellow */
            transform: translateY(-3px);
            box-shadow: 0 12px 20px rgba(255, 215, 0, 0.4);
        }
        .click-button:active {
            transform: translateY(0);
            box-shadow: 0 4px 8px rgba(255, 215, 0, 0.2);
        }
        .click-count {
            font-size: 4rem;
            font-weight: 700;
            color: #FFD700; /* Deep Yellow */
            margin-top: 1rem;
            line-height: 1; /* Adjust line height for "Total clicks" */
        }
        .total-clicks-label {
            font-size: 0.8rem; /* Very small text */
            color: #A0A0A0; /* Grey text */
            margin-top: 0.2rem; /* Small margin below count */
        }
        .user-count {
            position: absolute;
            top: 20px;
            right: 20px;
            background-color: #FFD700; /* Deep Yellow */
            color: #000000; /* Black text */
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            font-weight: 600;
            font-size: 1.1rem;
            box-shadow: 0 4px 6px rgba(255, 215, 0, 0.1);
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .top-left-buttons {
            position: absolute;
            top: 20px;
            left: 20px;
            display: flex;
            gap: 10px;
        }
        .top-left-button {
            background-color: #FFD700; /* Deep Yellow */
            color: #000000; /* Black emoji */
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 1.8rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 6px rgba(255, 215, 0, 0.1);
            transition: background-color 0.2s ease, transform 0.1s ease;
        }
        .top-left-button:hover {
            background-color: #E0B500;
            transform: translateY(-2px);
        }
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        .modal-content {
            background-color: #1a1a1a;
            color: #FFD700;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 8px 16px rgba(255, 215, 0, 0.3);
            max-width: 90%;
            width: 600px;
            border: 2px solid #FFD700;
            position: relative;
        }
        .modal-close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #FFD700;
            cursor: pointer;
        }
        .chat-messages {
            height: 300px;
            overflow-y: auto;
            border: 1px solid #FFD700;
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1rem;
            background-color: #000000;
        }
        .chat-message {
            margin-bottom: 0.5rem;
            word-wrap: break-word;
        }
        .chat-message strong {
            color: #FFD700; /* Yellow for sender */
        }
        .chat-input-container {
            display: flex;
            gap: 0.5rem;
        }
        .chat-input {
            flex-grow: 1;
            padding: 0.75rem;
            border-radius: 0.5rem;
            border: 1px solid #FFD700;
            background-color: #000000;
            color: #FFD700;
        }
        .chat-input::placeholder {
            color: #A0A0A0;
        }
        .send-chat-button {
            background-color: #FFD700;
            color: #000000;
            padding: 0.75rem 1.25rem;
            border-radius: 0.5rem;
            border: none;
            cursor: pointer;
            font-weight: 600;
            transition: background-color 0.2s ease;
        }
        .send-chat-button:hover {
            background-color: #E0B500;
        }

        @media (max-width: 600px) {
            .click-button {
                width: 150px;
                height: 150px;
                font-size: 6rem;
            }
            .click-count {
                font-size: 3rem;
            }
            .user-count {
                top: 10px;
                right: 10px;
                padding: 0.4rem 0.8rem;
                font-size: 0.9rem;
            }
            .top-left-buttons {
                top: 10px;
                left: 10px;
                gap: 5px;
            }
            .top-left-button {
                width: 40px;
                height: 40px;
                font-size: 1.5rem;
            }
            .modal-content {
                padding: 1.5rem;
            }
            .chat-messages {
                height: 200px;
            }
        }
    </style>
</head>
<body>
    <div class="user-count" id="user-count">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17l-3 3m0 0l-3-3m3 3V10m0 11a9 9 0 110-18 9 9 0 010 18z" />
        </svg>
        <span id="active-users">0</span> active users
    </div>

    <div class="top-left-buttons">
        <button class="top-left-button" id="chat-button">💬</button>
        <button class="top-left-button" id="info-button">ℹ️</button>
    </div>

    <div class="container">
        <button class="click-button" id="click-button">😌</button>
        <div class="click-count" id="total-clicks">0</div>
        <div class="total-clicks-label">Total clicks</div>
    </div>

    <!-- Chat Modal -->
    <div class="modal-overlay" id="chat-modal">
        <div class="modal-content">
            <button class="modal-close-button" id="chat-close-button">&times;</button>
            <h2 class="text-2xl font-bold mb-4">Live Chat</h2>
            <div class="chat-messages" id="chat-messages">
                <!-- Chat messages will be dynamically inserted here -->
            </div>
            <div class="chat-input-container">
                <input type="text" id="chat-input" class="chat-input" placeholder="Type your message...">
                <button id="send-chat-button" class="send-chat-button">Send</button>
            </div>
        </div>
    </div>

    <!-- Info Modal -->
    <div class="modal-overlay" id="info-modal">
        <div class="modal-content">
            <button class="modal-close-button" id="info-close-button">&times;</button>
            <h2 class="text-2xl font-bold mb-4">How it Works</h2>
            <p class="mb-2">Welcome to Synced Clicker! This is a simple, real-time collaborative app.</p>
            <p class="mb-2"><strong>Clicker:</strong> Click the large emoji button in the center to increment the global click count. Everyone connected sees the count update instantly!</p>
            <p class="mb-2"><strong>Active Users:</strong> The counter in the top right shows how many users are currently active on the page.</p>
            <p class="mb-2"><strong>Chat (💬):</strong> Click the chat icon in the top left to open a live chat. Share messages with other users. Messages are automatically deleted every 1.5 minutes to keep the chat fresh.</p>
            <p class="mb-2"><strong>Info (ℹ️):</strong> You're here! This popup explains the app's features.</p>
            <p class="text-sm text-gray-400 mt-4">Enjoy clicking and chatting!</p>
        </div>
    </div>

    <script src="/script.js"></script>
</body>
</html>
