import koffi from "koffi";

const User32 = koffi.load('user32.dll');
const WinMM = koffi.load('winmm.dll');

const DWORD = koffi.alias('DWORD', 'uint32_t');
const HANDLE = koffi.pointer(koffi.opaque('HANDLE'));
const HWND = koffi.alias('HWND', HANDLE);

export const FindWindowEx = User32.func('HWND __stdcall FindWindowExW(HWND hWndParent, HWND hWndChildAfter, const char16_t *lpszClass, const char16_t *lpszWindow)');
export const GetWindowThreadProcessId = User32.func('DWORD __stdcall GetWindowThreadProcessId(HWND hWnd, _Out_ DWORD *lpdwProcessId)');
export const GetWindowText = User32.func('int __stdcall GetWindowTextA(HWND hWnd, _Out_ uint8_t *lpString, int nMaxCount)');

// const InputUnion = koffi.struct('InputUnion', {
//
// })

export const Input = koffi.struct('Input', {
  // 0: MOUSE, 1: KEYBOARD, 2: HARDWARE
  'type': 'int',
  
  'wVK': 'short',
  'wCScan': 'short',
  'dwFlags': 'int',
  
  'time': 'int',
  'dwExtraInfo': 'int64'
})

export const SendInput = User32.func('int __stdcall SendInput(uint8_t cInputs, Input pInputs, int cbSize)')

export const ShowWindow = User32.func('bool __stdcall ShowWindow(HWND hWnd, int nCmdShow)')
