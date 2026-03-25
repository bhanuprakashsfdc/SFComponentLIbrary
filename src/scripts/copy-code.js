// Copy Code Functionality
// Provides copy-to-clipboard functionality for code blocks

function copyCode(elementId) {
  const codeBlock = document.getElementById(elementId);
  if (!codeBlock) return;
  
  // Get the text content from the code block
  const codeText = codeBlock.textContent || codeBlock.innerText;
  
  // Use the Clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(codeText).then(() => {
      showCopyFeedback(elementId);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      // Fallback to execCommand
      fallbackCopy(codeText, elementId);
    });
  } else {
    // Fallback for older browsers
    fallbackCopy(codeText, elementId);
  }
}

function fallbackCopy(text, elementId) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    document.execCommand('copy');
    showCopyFeedback(elementId);
  } catch (err) {
    console.error('Fallback copy failed: ', err);
  }
  
  document.body.removeChild(textarea);
}

function showCopyFeedback(elementId) {
  // Find the button that was clicked
  const codeContainer = document.getElementById(elementId)?.closest('.code-container');
  const copyButton = codeContainer?.querySelector('.copy-button');
  
  if (copyButton) {
    // Change button to show "Copied!" feedback
    const originalHTML = copyButton.innerHTML;
    copyButton.classList.add('copied');
    copyButton.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <span>Copied!</span>
    `;
    
    // Reset button after 2 seconds
    setTimeout(() => {
      copyButton.classList.remove('copied');
      copyButton.innerHTML = originalHTML;
    }, 2000);
  }
}

// Expose copyCode function globally so it can be called from onclick handlers
window.copyCode = copyCode;