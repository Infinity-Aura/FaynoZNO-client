import { attach, createDomain, sample } from 'effector';
import { Course, courseModel } from 'entities/course';
import { SurveyAnswerData, SurveyData } from 'shared/components/editor';

const domain = createDomain('features/course/create');

export const createCourseRequested = domain.event<{
  course: Partial<Course>;
  media: File[];
  image: File;
  documents: File[];
}>();
export const saveSurveyAnswerRequested = domain.event<{
  courseId: string;
  blockTitle: string;
  answer: SurveyAnswerData;
  surveyData: SurveyData[];
}>();

const createCourseFx = attach({ effect: courseModel.createCourseFx });
const saveSurveyAnswerFx = attach({ effect: courseModel.saveSurveyAnswerFx });
const uploadMediaFx = attach({ effect: courseModel.uploadMediaFx });
const uploadDocumentsFx = attach({ effect: courseModel.uploadDocumentsFx });
const uploadImageFx = attach({ effect: courseModel.uploadImageFx });

export const $media = domain.store<File[]>([]);
export const $image = domain.store<File>(new File([], ''));
export const $documents = domain.store<File[]>([]);

$media.on(createCourseRequested, (_, { media }) => media);
$image.on(createCourseRequested, (_, { image }) => image);
$documents.on(createCourseRequested, (_, { documents }) => documents);

sample({
  clock: createCourseRequested,
  fn: ({ course }) => course,
  target: createCourseFx,
});

sample({
  clock: saveSurveyAnswerRequested,
  target: saveSurveyAnswerFx,
});

sample({
  clock: createCourseFx.doneData,
  source: $media,
  filter: (media) => !!media.length,
  fn: (media, course) => ({ courseId: course.id, media }),
  target: uploadMediaFx,
});

sample({
  clock: createCourseFx.doneData,
  source: $image,
  filter: (image) => !!image.size,
  fn: (image, course) => ({ courseId: course.id, image }),
  target: uploadImageFx,
});

sample({
  clock: createCourseFx.doneData,
  source: $documents,
  filter: (documents) => !!documents.length,
  fn: (documents, course) => ({ courseId: course.id, documents }),
  target: uploadDocumentsFx,
});
