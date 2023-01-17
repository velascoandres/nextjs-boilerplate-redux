import { useModal } from '@/common/hooks/useModal'
import * as modalActions from '@/common/slices/modalSlice'
import { IOpenModalPayload } from '@/common/slices/modalSlice'
import { renderReduxHook } from '@/test-utils/renderReduxHook'


const openModalActionMock = jest.spyOn(modalActions, 'openModal')
const closeModalActionMock = jest.spyOn(modalActions, 'closeModal')


beforeEach(() => jest.clearAllMocks())

describe('useModal tests', () => {
  describe('When render hook', () => {
    test('should return open an close modal methods', () => {
      const { result } = renderReduxHook(useModal)


      const { openModal, closeModal } = result.current

      expect(openModal).toStrictEqual(expect.any(Function))
      expect(closeModal).toStrictEqual(expect.any(Function))
    })
  })

  describe('When open a modal', () => {
    test('should call openModal action', () => {
      const { result } = renderReduxHook(useModal)

      const { openModal } = result.current

      openModal({
        component: 'SomeComponent',
        props: undefined,
      } as unknown as IOpenModalPayload)

      expect(openModalActionMock).toBeCalledWith({
        component: 'SomeComponent',
        props: undefined,
      })
    })
  })

  describe('When close a modal', () => {
    test('should call closeModal action', () => {
      const { result } = renderReduxHook(useModal)

      const { closeModal } = result.current

      closeModal()

      expect(closeModalActionMock).toHaveBeenCalled()
    })
  })
})