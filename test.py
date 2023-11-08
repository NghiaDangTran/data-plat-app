# matrix nxn
# Rotate 90 degree

# Input:
# [1, 4, 7],
# [2, 5, 8],
# [3, 6, 9]


# [7,4,1]
# [8,5,2]
# [9,6,3]

# [1,2,3,4]
# [5,6,7,8]
# [9,1,2,3]
# [8,4,2,1]







# []


# []
matrix=[[1,2,3],
[4,5,6],
[7,8,9]]



for i in range(len(matrix)):
    for j in range(len(matrix)//2):
        
        temp=matrix[i][j]
        matrix[i][j]=matrix[j][i]
        matrix[j][i]=temp







for i in range(len(matrix)):

    
    matrix[i]=matrix[i][::-1]


time coplex=o(nlogn)
space complex= 1

print(matrix)
# Output:
# [7, 4, 1],
# [8, 5, 2],
# [9, 6, 3][[7, 4, 1], [6, 5, 2], [9, 8, 3]]

# You have to rotate the image in-place


# how to rotate 90
