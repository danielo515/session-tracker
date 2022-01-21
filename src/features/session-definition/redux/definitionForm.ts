import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionDefinition } from '@types';
import useAppSelector from 'hooks/useSelector';

export type Step = 'name' | 'color' | 'icon' | 'duration';

export const {
  reducer: descriptionFormReducer,
  actions: { setIcon, setColor, setDuration, setStep, setName, setInitialValue },
} = createSlice({
  name: 'descriptionForm',
  initialState: {
    step: 'name' as Step,
    name: '',
    color: '#cefece',
    icon: 'Default',
    duration: 60,
  },
  reducers: {
    nextStep: (state) => {
      state.step = 'color';
    },
    prevStep: (state) => {
      state.step = 'name';
    },
    setStep(state, action: PayloadAction<Step>) {
      state.step = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setIcon: (state, action: PayloadAction<string>) => {
      state.icon = action.payload;
    },
    setInitialValue(
      state,
      { payload: { name, color, icon, expectedDuration } }: PayloadAction<SessionDefinition>,
    ) {
      return { ...state, name, color, icon, duration: expectedDuration };
    },
  },
});

export const useDefinitionForm = () => {
  const { description } = useAppSelector((state) => {
    const { name, color, icon, duration } = state.descriptionForm;
    return { description: { name, color, icon, duration } };
  });

  return { description };
};
