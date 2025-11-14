import { Button } from '../../Global/styles';
import { OfferBox } from '../../Home/styles';
import { theme } from '../../Theme';
import { Joke, deleteJoke } from '../../api/Joke';
import { Table, TableData, TableHead } from '../MyJokes/styles';

export const DeleteJoke = ({ joke, updateJokes }: { joke: Joke; updateJokes: () => void }) => {
  const handleDelete = async () => {
    await deleteJoke(joke).then(() => {
      updateJokes();
    });
  };

  return (
    <OfferBox style={{ background: theme.postIt.red, flexDirection: 'column', width: '75%' }}>
      <Table>
        <TableHead>
          <tr>
            <th>Joke</th>
            <th>Punchline</th>
          </tr>
        </TableHead>
        <tbody>
          <tr key={joke.joke}>
            <TableData>{joke.joke}</TableData>
            <TableData>{joke.punchline}</TableData>
          </tr>
        </tbody>
      </Table>
      <br />
      <div style={{ marginBottom: '0.25rem' }}>Are you sure you want to delete this joke?</div>
      <Button onClick={handleDelete}>Delete Joke</Button>
    </OfferBox>
  );
};
