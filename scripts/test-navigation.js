// Script for testing navigation in Yoga & Meditation App
// This logs navigation state changes to help debug the prevStep function

console.log('Loading navigation test script...');

// Function to monitor PracticeFlowContext state changes
function monitorPracticeFlow() {
  // This is for use in the browser console to monitor navigation
  if (typeof window === 'undefined') return;
  
  let prevState = null;
  
  // Function to check for changes in the state
  const checkForChanges = () => {
    try {
      // Try to get the context state from React DevTools
      const state = window.__REACT_DEVTOOLS_GLOBAL_HOOK__?.renderers?.get(1)?.currentDispatcherRef?.current?.useContext?.(
        Array.from(window.__REACT_DEVTOOLS_GLOBAL_HOOK__?.renderers?.get(1)?._internalRoot?.current?.memoizedState?.memoizedState?.first?.value?.context?.Set || [])
          .find(c => c?._currentValue?.state?.navigationHistory)
      )?._currentValue?.state;
      
      if (state && (!prevState || JSON.stringify(state) !== JSON.stringify(prevState))) {
        console.log('%c 🧭 Navigation state changed:', 'background: #3b5998; color: white; padding: 2px 4px; border-radius: 2px;');
        console.log('Current step:', state.step);
        console.log('Practice type:', state.practiceType);
        
        if (state.practiceType === 'body') {
          console.log('Body state:', state.bodyState);
        } else if (state.practiceType === 'meditation') {
          console.log('Meditation state:', state.meditationState);
        } else if (state.practiceType === 'breathing') {
          console.log('Breathing state:', state.breathingState);
        }
        
        console.log('Navigation history:', state.navigationHistory);
        prevState = JSON.parse(JSON.stringify(state));
      }
    } catch (e) {
      // Silently fail if we can't access the state
    }
  };
  
  // Check every second
  setInterval(checkForChanges, 1000);
  
  console.log('Navigation monitor started. Check console for state changes.');
}

// Function to test the back navigation flow
// This simulates clicking back buttons and logs the result
function testBackNavigation() {
  // Find all back buttons in the page
  const backButtons = Array.from(document.querySelectorAll('button'))
    .filter(button => button.textContent?.includes('Назад') || button.textContent?.includes('Отмена'));
  
  console.log(`Found ${backButtons.length} back/cancel buttons on the page`);
  
  if (backButtons.length > 0) {
    console.log('Back/Cancel buttons found:');
    backButtons.forEach((button, index) => {
      console.log(`[${index}] ${button.textContent} - ${button.className}`);
    });
    
    console.log('To test a back button, run: testBackButton(0) (replace 0 with button index)');
  } else {
    console.log('No back/cancel buttons found on this page');
  }
}

// Function to test a specific back button
function testBackButton(index) {
  const backButtons = Array.from(document.querySelectorAll('button'))
    .filter(button => button.textContent?.includes('Назад') || button.textContent?.includes('Отмена'));
  
  if (index >= 0 && index < backButtons.length) {
    console.log(`Testing back button ${index}: ${backButtons[index].textContent}`);
    console.log('Current location before click:', window.location.pathname);
    
    // Click the button
    backButtons[index].click();
    
    // Log after click (will show the same location because React router doesn't do a full navigation)
    setTimeout(() => {
      console.log('Current location after click:', window.location.pathname);
      console.log('Button click completed, check state changes in console');
    }, 100);
  } else {
    console.log(`Invalid button index. There are ${backButtons.length} buttons available.`);
  }
}

// Make functions available in browser console
if (typeof window !== 'undefined') {
  window.monitorPracticeFlow = monitorPracticeFlow;
  window.testBackNavigation = testBackNavigation;
  window.testBackButton = testBackButton;
  
  console.log('Navigation test script loaded.');
  console.log('Available functions:');
  console.log('- monitorPracticeFlow() - Start monitoring state changes');
  console.log('- testBackNavigation() - Find back/cancel buttons on the page');
  console.log('- testBackButton(index) - Test a specific back button');
}

export { monitorPracticeFlow, testBackNavigation, testBackButton }; 