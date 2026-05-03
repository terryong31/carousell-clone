export default defineAppConfig({
  ui: {
    colors: {
      primary: 'red',
      neutral: 'slate'
    },

    modal: {
      slots: {
        overlay: 'fixed inset-0',
        content: 'bg-default divide-y divide-default flex flex-col focus:outline-none',
        header: 'flex items-center gap-1.5 p-4 sm:px-6 min-h-(--ui-header-height)',
        wrapper: '',
        body: 'flex-1 p-4 sm:p-6',
        footer: 'flex items-center gap-1.5 p-4 sm:px-6',
        title: 'text-highlighted font-semibold',
        description: 'mt-1 text-muted text-sm',
        close: 'absolute top-4 end-4'
      },
      variants: {
        transition: {
          true: {
            overlay: 'data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]',
            content: 'data-[state=open]:animate-[scale-in_200ms_ease-out] data-[state=closed]:animate-[scale-out_200ms_ease-in]'
          }
        },
        fullscreen: {
          true: {
            content: 'inset-0'
          },
          false: {
            content: 'w-[calc(100vw-2rem)] max-w-lg rounded-lg shadow-lg ring ring-default'
          }
        },
        overlay: {
          true: {
            overlay: 'bg-elevated/75'
          }
        },
        scrollable: {
          true: {
            overlay: 'overflow-y-auto',
            content: 'relative'
          },
          false: {
            content: 'fixed',
            body: 'overflow-y-auto'
          }
        }
      },
      compoundVariants: [
        {
          scrollable: true,
          fullscreen: false,
          class: {
            overlay: 'grid place-items-center p-4 sm:py-8'
          }
        },
        {
          scrollable: false,
          fullscreen: false,
          class: {
            content: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] overflow-hidden'
          }
        }
      ]
    },

    header: {
      slots: {
        root: 'bg-default backdrop-blur-none border-b border-default h-(--ui-header-height) sticky top-0 z-50',
        container: 'flex items-center justify-between gap-3 h-full',
        left: 'lg:flex-1 flex items-center gap-1.5',
        center: 'hidden lg:flex',
        right: 'flex items-center justify-end lg:flex-1 gap-1.5',
        title: 'shrink-0 font-bold text-xl text-highlighted flex items-end gap-1.5',
        toggle: 'lg:hidden',
        content: 'lg:hidden',
        overlay: 'lg:hidden',
        header: 'px-4 sm:px-6 h-(--ui-header-height) shrink-0 flex items-center justify-between gap-3',
        body: 'p-4 sm:p-6 overflow-y-auto'
      },
      variants: {
        toggleSide: {
          left: {
            toggle: '-ms-1.5'
          },
          right: {
            toggle: '-me-1.5'
          }
        }
      }
    },

    main: {
      base: 'min-h-[calc(100vh-var(--ui-header-height))]'
    },

    footer: {
      slots: {
        root: 'py-2',
        top: 'py-4 lg:py-6',
        bottom: '!py-0',
        container: 'text-sm text-muted py-4 lg:py-4 lg:flex lg:items-center lg:justify-between lg:gap-x-3',
        left: 'flex items-center justify-center lg:justify-start lg:flex-1 gap-x-1.5 lg:order-1',
        center: '!mt-0 lg:order-2 flex items-center justify-center',
        right: 'lg:flex-1 flex items-center justify-center lg:justify-end gap-x-1.5 lg:order-3'
      }
    },
    card: {
      slots: {
        root: 'rounded-lg overflow-hidden',
        header: '!p-0 !pb-2 text-xs',
        title: 'text-highlighted font-semibold',
        description: 'mt-1 text-muted text-sm',
        body: '!p-0 !pb-2',
        footer: '!pb-4 !p-0 text-sm'
      },
      variants: {
        variant: {
          solid: {
            root: 'bg-inverted text-inverted',
            title: 'text-inverted',
            description: 'text-dimmed'
          },
          outline: {
            root: 'bg-default divide-y-0 ring-0'
          },
          soft: {
            root: 'bg-elevated/50 divide-y-0 ring-0'
          },
          subtle: {
            root: 'bg-elevated/50 divide-y-0 ring-0'
          }
        }
      },
      defaultVariants: {
        variant: 'outline'
      }
    }
  }
})
