(function() {
  // Find current script tag to get bot-id
  const scriptTag = document.currentScript || document.querySelector('script[data-bot-id]');
  if (!scriptTag) {
    console.error("AuraBot: No se encontró el atributo data-bot-id en el script tag.");
    return;
  }
  
  const botId = scriptTag.getAttribute('data-bot-id');
  const apiUrl = new URL(scriptTag.src).origin;
  
  // Create UI
  const container = document.createElement('div');
  container.id = 'aurabot-container';
  container.style.position = 'fixed';
  container.style.bottom = '20px';
  container.style.right = '20px';
  container.style.zIndex = '999999';
  container.style.fontFamily = 'system-ui, -apple-system, sans-serif';
  document.body.appendChild(container);

  // Chat window (hidden by default)
  const chatWindow = document.createElement('div');
  chatWindow.style.display = 'none';
  chatWindow.style.flexDirection = 'column';
  chatWindow.style.width = '350px';
  chatWindow.style.height = '500px';
  chatWindow.style.backgroundColor = '#fff';
  chatWindow.style.boxShadow = '0 10px 40px rgba(0,0,0,0.15)';
  chatWindow.style.borderRadius = '16px';
  chatWindow.style.overflow = 'hidden';
  chatWindow.style.marginBottom = '20px';
  chatWindow.style.border = '1px solid #eee';
  
  // Header
  const header = document.createElement('div');
  header.style.backgroundColor = '#f97316'; // Primary Color
  header.style.color = '#fff';
  header.style.padding = '16px';
  header.style.fontWeight = 'bold';
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';
  header.style.alignItems = 'center';
  header.innerHTML = `
    <div style="display:flex; align-items:center; gap:8px;">
      <span style="font-size:20px;">🤖</span>
      <span>Asistente Inteligente</span>
    </div>
    <button id="aurabot-close" style="background:none; border:none; color:white; cursor:pointer; font-size:24px; padding:0; line-height:1;">&times;</button>
  `;
  chatWindow.appendChild(header);

  // Messages area
  const messagesArea = document.createElement('div');
  messagesArea.style.flex = '1';
  messagesArea.style.padding = '16px';
  messagesArea.style.overflowY = 'auto';
  messagesArea.style.display = 'flex';
  messagesArea.style.flexDirection = 'column';
  messagesArea.style.gap = '12px';
  messagesArea.style.backgroundColor = '#fafafa';
  chatWindow.appendChild(messagesArea);

  // Input area
  const inputArea = document.createElement('form');
  inputArea.style.display = 'flex';
  inputArea.style.padding = '12px';
  inputArea.style.borderTop = '1px solid #eee';
  inputArea.style.backgroundColor = '#fff';
  
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Escribe un mensaje...';
  input.style.flex = '1';
  input.style.padding = '10px 14px';
  input.style.border = '1px solid #ddd';
  input.style.borderRadius = '20px';
  input.style.outline = 'none';
  input.style.fontSize = '14px';
  
  const sendBtn = document.createElement('button');
  sendBtn.type = 'submit';
  sendBtn.innerHTML = '➤';
  sendBtn.style.background = '#f97316';
  sendBtn.style.color = '#fff';
  sendBtn.style.border = 'none';
  sendBtn.style.borderRadius = '50%';
  sendBtn.style.width = '36px';
  sendBtn.style.height = '36px';
  sendBtn.style.marginLeft = '8px';
  sendBtn.style.cursor = 'pointer';
  sendBtn.style.display = 'flex';
  sendBtn.style.alignItems = 'center';
  sendBtn.style.justifyContent = 'center';

  inputArea.appendChild(input);
  inputArea.appendChild(sendBtn);
  chatWindow.appendChild(inputArea);

  container.appendChild(chatWindow);

  // Toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.innerHTML = '💬';
  toggleBtn.style.width = '60px';
  toggleBtn.style.height = '60px';
  toggleBtn.style.borderRadius = '30px';
  toggleBtn.style.backgroundColor = '#f97316';
  toggleBtn.style.color = 'white';
  toggleBtn.style.border = 'none';
  toggleBtn.style.boxShadow = '0 4px 12px rgba(249, 115, 22, 0.4)';
  toggleBtn.style.cursor = 'pointer';
  toggleBtn.style.fontSize = '28px';
  toggleBtn.style.display = 'flex';
  toggleBtn.style.alignItems = 'center';
  toggleBtn.style.justifyContent = 'center';
  toggleBtn.style.marginLeft = 'auto';
  
  // Transition effects
  toggleBtn.style.transition = 'transform 0.2s';
  toggleBtn.onmouseover = () => toggleBtn.style.transform = 'scale(1.05)';
  toggleBtn.onmouseout = () => toggleBtn.style.transform = 'scale(1)';

  container.appendChild(toggleBtn);

  // Logic
  let isOpen = false;
  let history = [];

  const toggleChat = () => {
    isOpen = !isOpen;
    chatWindow.style.display = isOpen ? 'flex' : 'none';
    if (isOpen && history.length === 0) {
       addMessage('¡Hola! Soy el asistente virtual. ¿En qué puedo ayudarte hoy?', 'model');
    }
  };

  toggleBtn.onclick = toggleChat;
  header.querySelector('#aurabot-close').onclick = toggleChat;

  const addMessage = (text, sender) => {
    const bubble = document.createElement('div');
    bubble.style.maxWidth = '85%';
    bubble.style.padding = '10px 14px';
    bubble.style.borderRadius = '14px';
    bubble.style.fontSize = '14px';
    bubble.style.lineHeight = '1.4';
    bubble.style.wordBreak = 'break-word';
    
    if (sender === 'user') {
      bubble.style.backgroundColor = '#f97316';
      bubble.style.color = '#fff';
      bubble.style.alignSelf = 'flex-end';
      bubble.style.borderBottomRightRadius = '4px';
      bubble.textContent = text;
    } else {
      bubble.style.backgroundColor = '#eee';
      bubble.style.color = '#333';
      bubble.style.alignSelf = 'flex-start';
      bubble.style.borderBottomLeftRadius = '4px';
      // Basic markdown bold parsing for bot
      bubble.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }
    
    messagesArea.appendChild(bubble);
    messagesArea.scrollTop = messagesArea.scrollHeight;
    
    if (text) {
        history.push({ role: sender, text });
    }
  };

  inputArea.onsubmit = async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    
    addMessage(text, 'user');
    input.value = '';
    input.disabled = true;
    sendBtn.disabled = true;

    // Loading indicator
    const loadingBubble = document.createElement('div');
    loadingBubble.innerText = 'Escribiendo...';
    loadingBubble.style.fontSize = '12px';
    loadingBubble.style.color = '#999';
    loadingBubble.style.alignSelf = 'flex-start';
    messagesArea.appendChild(loadingBubble);

    try {
      const res = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          botId,
          message: text,
          history: history.slice(0, -1) // Excluding the message just added
        })
      });

      messagesArea.removeChild(loadingBubble);
      
      const data = await res.json();
      if (res.ok && data.response) {
        addMessage(data.response, 'model');
      } else {
        addMessage(data.error || "Ocurrió un error de conexión.", 'model');
      }
    } catch (err) {
      messagesArea.removeChild(loadingBubble);
      addMessage("No se pudo conectar con el servidor.", 'model');
    } finally {
      input.disabled = false;
      sendBtn.disabled = false;
      input.focus();
    }
  };

})();
