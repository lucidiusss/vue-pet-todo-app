export default {
  root: ({ props }) => ({
    class: [
      'overflow-hidden',
      {
        'animate-pulse': props.animation !== 'none'
      },

      // Round
      { 'rounded-full': props.shape === 'circle', 'rounded-md': props.shape !== 'circle' },

      // Colors
      'bg-zinc-300 dark:bg-zinc-500 transition delay-150 ease-in-out'
    ]
  })
}
