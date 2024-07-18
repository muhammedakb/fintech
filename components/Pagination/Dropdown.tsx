import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import * as DropdownMenu from 'zeego/dropdown-menu';

type PaginationDropdownProps = {
  pageNumber: number;
  onPageChange: (page: number) => void;
  totalPages: number;
};

const PaginationDropdown = ({
  pageNumber,
  onPageChange,
  totalPages,
}: PaginationDropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>
            Page {pageNumber} / {totalPages}
          </Text>
          <Ionicons name='chevron-down' size={20} style={{ marginLeft: 10 }} />
        </View>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {[...Array(totalPages)].map((_, index) => (
          <DropdownMenu.Item
            key={`ddpagination-${index}`}
            disabled={pageNumber === index + 1}
            onSelect={() => {
              onPageChange(index + 1);
            }}
          >
            <DropdownMenu.ItemTitle>
              {(index + 1).toString()}
            </DropdownMenu.ItemTitle>
            {pageNumber === index + 1 && (
              <DropdownMenu.ItemIcon
                ios={{
                  name: 'checkmark',
                  pointSize: 18,
                }}
              />
            )}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default PaginationDropdown;
