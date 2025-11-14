import { useQueryClient } from '@tanstack/react-query';
import classnames from 'classnames';
import { useState } from 'react';
import { Kebab, Modal } from '../../Global';
import { WriteJoke } from '../../Home/WriteJoke';
import { Emoji, FilterTag, OfferBox, OfferTitle } from '../../Home/styles';
import { theme } from '../../Theme';
import { Joke, getUserJokesKey, updateJoke, useGetJokes } from '../../api/Joke';
import { DeleteJoke } from '../DeleteJoke';
import { Table, TableData, TableHead } from './styles';
import thumbsUp from '../../Static/thumbsUp.png';

export const handleDisplayDate = (date: string | undefined) => {
  if (!date) {
    return '';
  }

  return new Date(date)?.toLocaleDateString();
};

export const MyJokes = () => {
  const queryClient = useQueryClient();
  const { data: myJokes = [] } = useGetJokes();
  const [activeJoke, setActiveJoke] = useState<string>('');
  const [showEditModal, setShowEditModal] = useState<Joke | false>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<Joke | false>(false);

  return (
    <OfferBox style={{ width: '75%', background: theme.postIt.green }}>
      <OfferTitle>My Jokes</OfferTitle>
      <Table>
        <TableHead>
          <tr>
            <th>Date</th>
            <th>Joke</th>
            <th>Punchline</th>
            {/* <th style={{ width: '10%' }}>Tags</th> */}
            <th>
              <Emoji src={thumbsUp} alt='thumbs-up' className={classnames({ selected: true })} />
            </th>
            <th>Actions</th>
          </tr>
        </TableHead>
        <tbody>
          {myJokes.map((joke) => (
            <tr key={joke.joke}>
              <TableData>{handleDisplayDate(joke.timestamp)}</TableData>
              <TableData>{joke.joke}</TableData>
              <TableData>{joke.punchline}</TableData>
              {/* <TableData
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                }}
              >
                {joke.tags?.map((tag) => (
                  <FilterTag
                    key={tag}
                    style={{ width: 'fit-content' }}
                    className={classnames({ selected: true })}
                  >
                    {tag}
                  </FilterTag>
                ))}
              </TableData> */}
              <TableData>{joke.totalUpVotes}</TableData>
              <TableData
                onClick={() => setActiveJoke((prev) => (prev === joke._id ? '' : joke._id ?? ''))}
              >
                <Kebab isActive={activeJoke === joke._id}>
                  <p onClick={() => setShowEditModal(joke)}>✏️</p>
                  <p onClick={() => setShowDeleteModal(joke)}>🗑️</p>
                </Kebab>
              </TableData>
            </tr>
          ))}
        </tbody>
      </Table>
      {showEditModal && (
        <Modal close={() => setShowEditModal(false)}>
          <WriteJoke
            joke={showEditModal}
            overrideContent={{
              title: 'Update Joke',
              saveBtnText: 'Update Joke',
              styles: { width: '80%' },
              inputWrapperStyles: { width: '-webkit-fill-available' },
              saveBtnAction: (joke) =>
                new Promise((resolve) =>
                  resolve(
                    updateJoke(joke).then((res) => {
                      setShowEditModal(false);
                      queryClient.invalidateQueries({ queryKey: getUserJokesKey });
                      return res;
                    })
                  )
                )
            }}
          />
        </Modal>
      )}
      {showDeleteModal && (
        <Modal close={() => setShowDeleteModal(false)}>
          <DeleteJoke
            joke={showDeleteModal}
            updateJokes={() => {
              queryClient.invalidateQueries({ queryKey: getUserJokesKey });
              setShowDeleteModal(false);
            }}
          />
        </Modal>
      )}
    </OfferBox>
  );
};
