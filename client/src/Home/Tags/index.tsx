import classnames from 'classnames';
import { Input } from '../../LogIn/styles';
import { TagsWrapper, FilterTag } from '../styles';

type Props = {
  tags: string[] | undefined;
  setTags: (tags: string[], pushStr?: string) => void;
};

export const _setTags = (tags: string[], setState: (tags: string[]) => void, pushStr?: string) => {
  if (pushStr) {
    tags.push(pushStr);
  }
  setState(tags);
};

export const JokeTags = ({ tags, setTags }: Props) => {
  const setNewTag = (value: string) => {
    let valueArr = value.split(',');
    let formattedTagsArr = valueArr.map((tag) => tag.toLowerCase());

    setTags(formattedTagsArr);
  };

  const cleanTags = () => {
    let cleanedTags = tags?.map((tag) => tag.trim()).filter((tag) => tag.trim().length) ?? [];
    let dedupedTags = cleanedTags.filter((tag, index) => cleanedTags.indexOf(tag) === index);

    setTags(dedupedTags.slice(0, 10), ' ');
  };

  const finalCleanTags = () => {
    cleanTags();
    const forThoseWeirdos = tags?.filter((tag) => tag.trim().length) ?? [];
    setTags(forThoseWeirdos.slice(0, 10));
  };

  return (
    <TagsWrapper>
      {tags?.length && tags[0].trim().length ? (
        <div style={{ justifyContent: 'center' }}>
          {tags.map((tag: string, index) => (
            <FilterTag key={`${tag}${index}`} className={classnames({ selected: true })}>
              {tag}
            </FilterTag>
          ))}
        </div>
      ) : null}
      <Input
        onChange={({ target: { value } }) => setNewTag(value)}
        onKeyUp={({ key }) => key === ',' && cleanTags()}
        onBlur={finalCleanTags}
        placeholder={!!tags?.length ? '' : 'Games, Dogs, Dad Jokes, Work'}
        value={tags}
        autoComplete='off'
        style={{ textTransform: 'capitalize' }}
      />
    </TagsWrapper>
  );
};
