import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PaginationDropdown from './Dropdown';

type PaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
};

const Pagination = ({
  currentPage,
  onPageChange,
  totalPages,
}: PaginationProps) => {
  const [pageNumber, setPageNumber] = useState(currentPage);

  const previousDisabled = pageNumber === 1;
  const forwardDisabled = pageNumber === totalPages || !totalPages;

  const handlePrevious = () => {
    if (pageNumber > 1) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
      onPageChange(pageNumber - 1);
    }
  };

  const handleNext = () => {
    if (pageNumber < totalPages) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
      onPageChange(pageNumber + 1);
    }
  };

  const handleChange = (num: number) => {
    setPageNumber(num);
    onPageChange(num);
  };

  return (
    <View
      style={[
        defaultStyles.container,
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 10,
        },
      ]}
    >
      <TouchableOpacity disabled={previousDisabled} onPress={handlePrevious}>
        <Ionicons
          name='chevron-back-outline'
          size={20}
          color={previousDisabled ? Colors.primaryMuted : Colors.primary}
        />
      </TouchableOpacity>
      <View>
        <Text>
          {totalPages === 0 ? (
            'No data'
          ) : (
            <PaginationDropdown
              pageNumber={pageNumber}
              onPageChange={handleChange}
              totalPages={totalPages}
            />
          )}
        </Text>
      </View>

      <TouchableOpacity disabled={forwardDisabled} onPress={handleNext}>
        <Ionicons
          name='chevron-forward-outline'
          size={20}
          color={
            pageNumber === totalPages || !totalPages
              ? Colors.primaryMuted
              : Colors.primary
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({});
