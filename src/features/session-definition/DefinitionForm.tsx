import { IconSelector } from './Iconselector';
import { DurationSlider } from './DurationSlider';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { HexColorPicker } from 'react-colorful';
import { Page } from 'features/common';
import FormRow from 'features/common/FormRow';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SessionDefinition, SessionDefinitionFromDb } from '@types';
import { ExpandMore } from '@mui/icons-material';
import * as Icons from '@common/Icon/Icon';
import {
  Step,
  useDefinitionForm,
  setIcon,
  setColor,
  setStep,
  setDuration,
  setName,
  setInitialValue,
} from './redux/definitionForm';
import useAppSelector from 'hooks/useSelector';
import { useAppDispatch } from '@common/configStore';
import { IconCollection } from '@common/Icon/types';
import { formatMinutes4Human } from 'formatters/formatMinutes4Human';

type SectionProps = {
  children: React.ReactNode;
  title: React.ReactNode;
  hint: React.ReactNode;
  step: Step;
  noPadding?: boolean;
};

const Section = ({ children, title, hint, step, noPadding = false }: SectionProps) => {
  const shouldBeExpanded = useAppSelector((state) => state.descriptionForm.step === step);
  const dispatch = useAppDispatch();
  return (
    <Accordion
      TransitionProps={{ unmountOnExit: true }}
      expanded={shouldBeExpanded}
      onChange={() => dispatch(setStep(step))}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-label="expand icon"
        aria-controls="icon-content"
        id="icon-header"
        sx={{
          alignItems: 'baseline',
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <Box ml={2} display="flex" alignItems="center">
          {hint}
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ px: noPadding ? 0 : undefined }}>{children}</AccordionDetails>
    </Accordion>
  );
};

const NameSection = () => {
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.descriptionForm.name);
  return (
    <Section title="Title" hint={name} step="name">
      <Typography variant="subtitle1">
        How sessions created with this template will be named
      </Typography>
      <TextField
        type="text"
        variant="filled"
        id="session"
        name="session-name"
        autoComplete="session"
        fullWidth
        value={name}
        onChange={(e) => dispatch(setName(e.target.value))}
        required
      />
    </Section>
  );
};

const ColoredBox = styled(Box)({
  border: '1px solid',
  borderRadius: '5px',
  height: '15px',
  width: '15px',
  margin: 'auto 0',
});

const ColorSection = () => {
  const dispatch = useAppDispatch();
  const color = useAppSelector((state) => state.descriptionForm.color);
  return (
    <Section title="Color" hint={<ColoredBox bgcolor={color} />} step="color">
      <Typography variant="subtitle1" pb={1}>
        Assigning a color will give you a visual help to find sessions of this type
      </Typography>
      <HexColorPicker color={color} onChange={(value) => dispatch(setColor(value))} />
    </Section>
  );
};

const DurationSection = () => {
  const dispatch = useAppDispatch();
  const duration = useAppSelector((state) => state.descriptionForm.duration);
  return (
    <Section title="Expected duration" hint={formatMinutes4Human(duration)} step="duration">
      <Typography variant="subtitle1">How much will this task usually last?</Typography>
      <DurationSlider
        value={duration}
        onChange={(value) => dispatch(setDuration(value))}
        valueLabelDisplay="on"
      />
    </Section>
  );
};

const icons = Icons as IconCollection;

const IconSection = () => {
  const dispatch = useAppDispatch();
  const icon = useAppSelector((state) => state.descriptionForm.icon);
  const Icon = icons[icon];

  return (
    <Section title="Icon" hint={<Icon color="primary"></Icon>} step="icon" noPadding>
      <Typography variant="subtitle1" px={2}>
        Assign an icon to this task
      </Typography>
      <IconSelector icon={icon} onChange={(value) => dispatch(setIcon(value))} />
    </Section>
  );
};

type CreateCb = (definition: SessionDefinition) => Promise<unknown>;
type UpdateCb = (definition: SessionDefinitionFromDb) => Promise<unknown>;

type Props =
  | {
      isLoading: boolean;
      onSubmit: CreateCb;
      definition: SessionDefinition;
      action: 'create';
    }
  | {
      isLoading: boolean;
      onSubmit: UpdateCb;
      definition: SessionDefinitionFromDb;
      action: 'update';
    };

const SaveSection = (props: Props) => {
  const { action, onSubmit, isLoading, definition } = props;
  const {
    description: { name, color, duration, icon },
  } = useDefinitionForm();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (action === 'update') {
      dispatch(setInitialValue(definition));
    }
  }, []);
  const submit = () => {
    if (action === 'update') {
      onSubmit({
        id: definition.id,
        name,
        color,
        expectedDuration: duration,
        icon,
      });
    } else {
      onSubmit({
        name,
        color,
        expectedDuration: duration,
        icon,
      });
    }
  };
  return (
    <Box pb={2}>
      <FormRow centered row>
        <Button
          disabled={isLoading}
          color="secondary"
          variant="outlined"
          size="large"
          component={Link}
          to="/timer"
        >
          Cancel
        </Button>
        <Button
          onClick={submit}
          disabled={isLoading}
          color="primary"
          variant="contained"
          size="large"
        >
          {action === 'update' ? 'Save' : 'Create'}
        </Button>
      </FormRow>
    </Box>
  );
};

export default function DefinitionForm(props: Props) {
  return (
    <Page className="session-definition-create" scroll>
      <Container maxWidth="sm">
        <NameSection />
        <ColorSection />
        <DurationSection />
        <IconSection />
        <SaveSection {...props} />
      </Container>
    </Page>
  );
}
