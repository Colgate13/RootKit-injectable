#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>

int main(int argc, char *argv[]) {
    int sockfd, portno, n;
    struct sockaddr_in serv_addr;
    struct hostent *server;

    char buffer[256];
    if (argc < 3) {
       fprintf(stderr,"usage %s hostname port\n", argv[0]);
       exit(0);
    }

    portno = atoi(argv[2]);
    sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (sockfd < 0) {
        perror("ERROR opening socket");
        exit(1);
    }

    server = gethostbyname(argv[1]);
    if (server == NULL) {
        fprintf(stderr,"ERROR, no such host\n");
        exit(0);
    }

    bzero((char *) &serv_addr, sizeof(serv_addr));
    serv_addr.sin_family = AF_INET;
    bcopy((char *)server->h_addr_list,
         (char *)&serv_addr.sin_addr.s_addr,
         server->h_length);
    serv_addr.sin_port = htons(portno);

    if (connect(sockfd,(struct sockaddr *)&serv_addr,sizeof(serv_addr)) < 0) {
        perror("ERROR connecting");
        exit(1);
    }

    printf("Please enter the message: ");
    bzero(buffer,256);
    fgets(buffer,255,stdin);
    n = write(sockfd,buffer,strlen(buffer));
    if (n < 0) {
         perror("ERROR writing to socket");
         exit(1);
    }

    bzero(buffer,256);
    n = read(sockfd,buffer,255);
    if (n < 0) {
         perror("ERROR reading from socket");
         exit(1);
    }
    printf("%s\n",buffer);

    // Execute a command in the background
    pid_t pid = fork();
    if (pid == 0) {
        // Child process
        int ret = system("ls -al /tmp &");
        exit(ret);
    } else if (pid > 0) {
        // Parent process
        printf("Spawned child process with PID %d\n", pid);
        int status;
        waitpid(pid, &status, 0);
        printf("Child process exited with status %d\n", WEXITSTATUS(status));
    } else {
        // Fork error
        perror("fork");
        exit(1);
    }

    close(sockfd);
    return 0;
}
