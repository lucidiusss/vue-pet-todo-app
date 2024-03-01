export default {
  root: ({ props, context, parent }) => ({
    class: [
      // Font
      'font-sans leading-none',

      // Flex
      { 'flex-1 w-[1%]': parent.instance.$name == 'InputGroup' },

      // Spacing
      'm-0',
      {
        'px-4 py-4': props.size == 'large',
        'px-2 py-2': props.size == 'small',
        'p-3': props.size == null
      },
      //
      // Shape
      { 'rounded-xl': parent.instance.$name !== 'InputGroup' },
      {
        'first:rounded-l-md rounded-none last:rounded-r-md': parent.instance.$name == 'InputGroup'
      },
      { 'border-0 border-y border-l last:border-r': parent.instance.$name == 'InputGroup' },
      { 'first:ml-0 -ml-px': parent.instance.$name == 'InputGroup' && !props.showButtons },

      // Colors
      'bg-zinc-200 dark:bg-zinc-500',
      'placeholder:text-zinc-400 dark:placeholder:text-zinc-500',
      'bg-zinc-200 dark:bg-zinc-500',
      'border',
      { 'border-zinc-300 dark:border-zinc-600': !props.invalid },

      // Invalid State
      { 'border-red-500 dark:border-red-400': props.invalid },

      // States
      {
        'hover:border-zinc-500 dark:hover:border-zinc-400 transition ease-in-out':
          !context.disabled && !props.invalid,
        'focus:outline-none focus:outline-offset-0 focus:ring focus:ring-zinc-400/50 dark:focus:ring-zinc-300/50 ':
          !context.disabled,
        'opacity-60 select-none pointer-events-none cursor-default': context.disabled
      },

      // Filled State *for FloatLabel
      { filled: parent.instance?.$name == 'FloatLabel' && context.filled },

      // Misc
      'appearance-none',
      'transition-colors'
    ]
  })
}
