import koffi from "koffi";

const User32 = koffi.load('user32.dll');
const WinMM = koffi.load('winmm.dll');

// Declare constants
export const MB_OK = 0x0;
export const MB_YESNO = 0x4;
export const MB_ICONQUESTION = 0x20;
export const MB_ICONINFORMATION = 0x40;
export const IDOK = 1;
export const IDYES = 6;
export const IDNO = 7;

export const MessageBoxA = User32.stdcall('MessageBoxA', 'int', ['void *', 'str', 'str', 'uint']);
export const MessageBoxW = User32.stdcall('MessageBoxW', 'int', ['void *', 'str16', 'str16', 'uint']);
export const FindWindowA = User32.stdcall('FindWindowA', 'long', ['str', 'str']);
export const GetForegroundWindow = User32.stdcall('GetForegroundWindow', 'long', []);
export const GetWindowThreadProcessId = User32.stdcall('GetWindowThreadProcessId', 'long', ['void *, long']);

export const waveOutSetVolume = WinMM.stdcall('waveOutSetVolume', 'void', ['long', 'long'])
