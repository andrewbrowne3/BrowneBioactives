import os

import uvicorn

if __name__ == '__main__':
    if not os.environ.get('ANTHROPIC_API_KEY'):
        raise RuntimeError('ANTHROPIC_API_KEY not set')
    port = int(os.environ.get('AGENT_PORT', '5031'))
    uvicorn.run('rest_server:app', host='0.0.0.0', port=port)
