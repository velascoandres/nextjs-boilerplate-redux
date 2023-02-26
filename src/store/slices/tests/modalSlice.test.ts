import reducer, { closeModal, IModalState, openModal } from '../modalSlice'


describe('loaderSlice tests', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, { type: undefined })   
      
    expect(state).toStrictEqual({
      componentProps: {},
      isOpen: false,
      modalConfig: {
        closeOnClickOutside: false,
        closeOnEscapeKeydown: false,
      }
    })
  })

  it('should open a modal', () => {
    const state = reducer(undefined, openModal({
      component: 'SomeModalComponent',
      props: { propA: 'A' },
    }))
      
    expect(state).toStrictEqual({
      component: 'SomeModalComponent',
      componentProps: { propA: 'A' },
      isOpen: true,
      modalConfig: {
        closeOnClickOutside: false,
        closeOnEscapeKeydown: false,
      }
    })
  })

  it('should close the modal', () => {
    const oldLoaderState = {
      component: 'SomeModalComponent',
      componentProps: { propA: 'A' },
      isOpen: true
    } as unknown as IModalState

    const state = reducer(oldLoaderState, closeModal({}))

    expect(state).toStrictEqual({
      component: 'SomeModalComponent',
      componentProps: { propA: 'A' },
      isOpen: false,
      modalConfig: {
        closeOnClickOutside: false,
        closeOnEscapeKeydown: false,
      }
    })
  })

  it('should open modal with another config', () => {
    const state = reducer(undefined, openModal({
      component: 'SomeModalComponent',
      props: { propA: 'A' },
      config: {
        closeOnClickOutside: true,
        closeOnEscapeKeydown: false,
      }
    }))
      
    expect(state).toStrictEqual({
      component: 'SomeModalComponent',
      componentProps: { propA: 'A' },
      isOpen: true,
      modalConfig: {
        closeOnClickOutside: true,
        closeOnEscapeKeydown: false,
      }
    })
  })
})
