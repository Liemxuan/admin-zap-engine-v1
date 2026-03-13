import './style.css'
import './components/atoms/zap-button'
import './components/atoms/zap-input'
import './components/atoms/zap-checkbox'
import './components/atoms/zap-radio'
import './components/atoms/zap-switch'
import './components/atoms/zap-card'
import './components/atoms/zap-badge'
import './components/atoms/zap-alert'
import './components/atoms/zap-skeleton'
import './components/atoms/zap-tabs'
import './components/atoms/zap-accordion'
import './components/molecules/zap-dialog'
import './components/organisms/zap-login'
import { setupCounter } from './counter'
import { createIcons, Plus, Search, Settings, User, Download, Send, Trash2, CheckCircle, AlertCircle, Eye, EyeOff, Lock, Layout, ChevronDown, X } from 'lucide'

const icons = {
  Plus, Search, Settings, User, Download, Send, Trash2, CheckCircle, AlertCircle, Eye, EyeOff, Lock, Layout, ChevronDown, X
};

// Initialize Lucide icons globally for the main document
createIcons({ icons });

// Make lucide available globally for shadow DOM components
// We wrap it so that subsequent calls to createIcons automatically use the correct icons
(window as any).lucide = {
  createIcons: (options: any) => createIcons({ icons, ...options })
};

console.log('ZAP Design System: Components Synced')

// Initialize Counter
const counterBtn = document.getElementById('counter-btn')
if (counterBtn) {
  setupCounter(counterBtn)
}

// Dialog Interactivity
const trigger = document.getElementById('dialog-trigger')
const overlay = document.getElementById('dialog-overlay')
const content = document.getElementById('dialog-content')
const closeBtn = document.getElementById('dialog-close')

function openDialog() {
  overlay?.classList.remove('hidden')
  overlay?.classList.add('flex')

  // Trigger animations in next tick
  setTimeout(() => {
    overlay?.classList.remove('opacity-0')
    content?.classList.remove('scale-90', 'opacity-0')
    content?.classList.add('scale-100', 'opacity-100')
  }, 10)
}

function closeDialog() {
  overlay?.classList.add('opacity-0')
  content?.classList.remove('scale-100', 'opacity-100')
  content?.classList.add('scale-90', 'opacity-0')

  // Hide after animation
  setTimeout(() => {
    overlay?.classList.add('hidden')
    overlay?.classList.remove('flex')
  }, 300)
}

trigger?.addEventListener('click', openDialog)
closeBtn?.addEventListener('click', closeDialog)

// Close on overlay click
overlay?.addEventListener('click', (e) => {
  if (e.target === overlay) closeDialog()
})

// Add some smooth scroll logic for the sidebar
document.querySelectorAll('aside nav a').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault()
    const target = e.currentTarget as HTMLAnchorElement
    const targetId = target.getAttribute('href')?.substring(1)
    const targetElement = document.getElementById(targetId || '')

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  })
})
