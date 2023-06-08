import koffi from "koffi";

const User32 = koffi.load('user32.dll');
const WinMM = koffi.load('winmm.dll');

const DWORD = koffi.alias('DWORD', 'uint32_t');
const HANDLE = koffi.pointer(koffi.opaque('HANDLE'));
const HWND = koffi.alias('HWND', HANDLE);

export const FindWindowEx = User32.func('HWND __stdcall FindWindowExW(HWND hWndParent, HWND hWndChildAfter, const char16_t *lpszClass, const char16_t *lpszWindow)');
export const GetWindowThreadProcessId = User32.func('DWORD __stdcall GetWindowThreadProcessId(HWND hWnd, _Out_ DWORD *lpdwProcessId)');
export const GetWindowText = User32.func('int __stdcall GetWindowTextA(HWND hWnd, _Out_ uint8_t *lpString, int nMaxCount)');

export const SendInput = User32.func('int __stdcall SendInput(uint8_t cInputs, LPINPUT pInputs, int cbSize)')
