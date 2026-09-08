#!/usr/bin/env python3

import http.server
import socketserver
import os
import sys
from pathlib import Path

class GameServerHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        super().end_headers()

    def log_message(self, format, *args):
        print(f'[{self.log_date_time_string()}] {format % args}')

def run_server(port=80):
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    try:
        handler = GameServerHandler
        with socketserver.TCPServer(('', port), handler) as httpd:
            print('='*50)
            print(' HARVESTLIGHT DEVELOPMENT SERVER')
            print('='*50)
            print()
            print(f'Server running at:')
            print()
            if port == 80:
                print('http://localhost')
            else:
                print(f'http://localhost:{port}')
            print()
            print('Press CTRL+C to stop.')
            print()
            httpd.serve_forever()
    except PermissionError:
        print('='*50)
        print(' HARVESTLIGHT DEVELOPMENT SERVER')
        print('='*50)
        print()
        print('ERROR: Port 80 requires administrator/root privileges.')
        print()
        print('Try running with a different port:')
        print()
        print('  python server.py --port 8000')
        print()
        sys.exit(1)
    except OSError as e:
        print(f'ERROR: {e}')
        print()
        print('Try using a different port:')
        print()
        print('  python server.py --port 8000')
        print()
        sys.exit(1)

if __name__ == '__main__':
    port = 80
    
    if len(sys.argv) > 1:
        if sys.argv[1] == '--port' and len(sys.argv) > 2:
            try:
                port = int(sys.argv[2])
            except ValueError:
                print(f'Invalid port: {sys.argv[2]}')
                sys.exit(1)
    
    run_server(port)
