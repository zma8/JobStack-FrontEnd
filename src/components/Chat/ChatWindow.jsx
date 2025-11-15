import { useState, useEffect, useRef } from 'react';
import { getChatMessages, sendMessage } from '../../services/chatService';
import socket from '../../socket';

