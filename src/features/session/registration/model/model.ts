import { attach, createDomain, sample } from 'effector';
import { sessionModel } from 'entities/session';
import { Registration } from './types';

const domain = createDomain('features/session/registration');

export const registrationRequested = domain.event<Registration>();

export const registrationFx = attach({ effect: sessionModel.registrationFx });

sample({ clock: registrationRequested, target: registrationFx });
