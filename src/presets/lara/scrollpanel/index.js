export default {
  wrapper: {
    class: [
      // Size & Position
      'h-full w-full',

      // Layering
      'z-[1]',

      // Spacing
      'overflow-hidden',

      // Misc
      'relative float-left'
    ]
  },
  content: {
    class: [
      // Size & Spacing
      'h-[calc(100%+18px)] w-[calc(100%+18px)] pr-[18px] pb-[18px] pl-0 pt-0',

      // Overflow & Scrollbar
      'overflow-scroll scrollbar-none',

      // Box Model
      'box-border',

      // Position
      'relative',

      // Webkit Specific
      '[&::-webkit-scrollbar]:hidden'
    ]
  },
  barX: {
    class: [
      // Size & Position
      'h-[9px] bottom-0',

      // Appearance
      'bg-zinc-100 rounded',

      // Interactivity
      'cursor-pointer',

      // Visibility & Layering
      'invisible z-20',

      // Transition
      'transition  ease-in-out delay-150',

      // Misc
      'relative'
    ]
  },
  barY: {
    class: [
      // Size & Position
      'w-[7px] top-0',

      // Appearance
      'bg-zinc-300 dark:bg-zinc-600 rounded outline-none',

      // Interactivity
      'cursor-pointer',

      // Visibility & Layering
      'z-20  opacity-0 active:opacity-100 hover:opacity-100',

      // Transition
      'transition  ease-in-out delay-150 hover:delay-0',

      // Misc
      'relative'
    ]
  }
}
