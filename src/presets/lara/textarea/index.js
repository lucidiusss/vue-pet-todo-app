export default {
  root: ({ context, props }) => ({
    class: [
      // Font
      'font-sans leading-none',

      // Spacing
      'm-0',
      'p-3',

      // Shape
      'rounded-xl',

      // Colors
      'bg-zinc-200 dark:bg-zinc-500',
      'placeholder:text-zinc-400 dark:placeholder:text-zinc-700',
      'bg-zinc-200 dark:bg-zinc-500',
      'border',
      { 'border-zinc-300 dark:border-zinc-600': !props.invalid },

      // Invalid State
      { 'border-red-500 dark:border-red-400': props.invalid },

      // States
      {
        'hover:border-zinc-500 dark:hover:border-zinc-400': !context.disabled && !props.invalid,
        'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-zinc-500/50 dark:focus:ring-zinc-400/50':
          !context.disabled,
        'opacity-60 select-none pointer-events-none cursor-default': context.disabled
      },

      // Misc
      'appearance-none',
      'transition-colors duration-200'
    ]
  })
}
