clear all; close all; clc;
%% Setting
E = 20*10^9; %[GPa]
l = 2; %[m]
h = 0.1; %[m]
w = 0.1; %[m]

W = 1; %[N]

I = w*h^3/12;
x = 0:l/1000:l;
int = l/1000;

%% Shape Function
int = 1;
xi = 0:int/1000:int;
N1 = zeros(1,length(x));
N2 = zeros(1,length(x));
N3 = zeros(1,length(x));
N4 = zeros(1,length(x));
N = zeros(1,length(x));

for i=1:length(xi)
    N1(i) = 1-3*xi(i)^2/int^2+2*xi(i)^3/int^3;
    N2(i) = xi(i)^2/int^2*(3-2*xi(i)/int);
    N3(i) = xi(i)*(1-2*xi(i)/int+xi(i)^2/int^2);
    N4(i) = xi(i)^2/int*(xi(i)/int-1);
    N(i) = N1(i) + N2(i) - N3(i) - N4(i);
end

figure
plot(xi,N1);
hold on
plot(xi,-N3);
plot(xi,N2);
plot(xi,-N4);
plot(xi,N);
hold off
grid on
xlim([0 int]);
xlabel('x [m]');
title('Shape Functions');
legend('N_1','N_2','N_3','N_4','SUM','Location','east');
saveas(gcf,'Shape_Functions.png');


%% Simple Supported Beam (One-Point)
V = zeros(1,length(x));
M = zeros(1,length(x));
theta = zeros(1,length(x));
w = zeros(1,length(x));

% Calculation
for i=1:length(x)
    if (x(i) < 1)
        V(i) = 0.5;
        M(i) = 0.5*x(i);
        theta(i) = -(x(i)^2-1)/4/E/I;
        w(i) = -(x(i)^3-3*x(i))/12/E/I;
    else
        V(i) = -0.5;
        M(i) = -0.5*x(i)+1;
        theta(i) = -(-x(i)^2+4*x(i)-3)/4/E/I;
        w(i) = -(-x(i)^3+6*x(i)^2-9*x(i)+2)/12/E/I;
    end
end

% Drawing
f = figure;
f.Position = [10 10 800 600];
subplot(2,2,1);
plot(x,V,'r-');
xlim([0 l]);
title('Shear Force');
ylabel('V [N]');
xlabel('x [m]');
grid on

subplot(2,2,2);
plot(x,M,'r-');
xlim([0 l]);
title('Bending Moment');
ylabel('M [Nm]');
xlabel('x [m]');
grid on

subplot(2,2,3);
plot(x,theta,'r-');
xlim([0 l]);
title('Beam Slope');
ylabel('\theta');
xlabel('x [m]');
grid on
ax = gca;
ax.YDir = 'reverse';

subplot(2,2,4);
plot(x,w,'r-');
xlim([0 l]);
title('Displacement');
ylabel('w [m]');
xlabel('x [m]');
grid on
ax = gca;
ax.YDir = 'reverse';

saveas(gcf,'Simple_Supported_Beam.png');



%% Simple Supported Beam (Distributed)
V = zeros(1,length(x));
M = zeros(1,length(x));
theta = zeros(1,length(x));
w = zeros(1,length(x));

% Calculation
for i=1:length(x)
    V(i) = 1-x(i);
    M(i) = -x(i)^2/2+x(i);
    theta(i) = -(-x(i)^3/6+x(i)^2/2-1/3)/E/I;
    w(i) = -(-x(i)^4/24+x(i)^3/6-x(i)/3)/E/I;
end

% Drawing
f = figure;
f.Position = [10 10 800 600];
subplot(2,2,1);
plot(x,V,'r-');
xlim([0 l]);
title('Shear Force');
ylabel('V [N]');
xlabel('x [m]');
grid on

subplot(2,2,2);
plot(x,M,'r-');
xlim([0 l]);
title('Bending Moment');
ylabel('M [Nm]');
xlabel('x [m]');
grid on

subplot(2,2,3);
plot(x,theta,'r-');
xlim([0 l]);
title('Beam Slope');
ylabel('\theta');
xlabel('x [m]');
grid on
ax = gca;
ax.YDir = 'reverse';

subplot(2,2,4);
plot(x,w,'r-');
xlim([0 l]);
title('Displacement');
ylabel('w [m]');
xlabel('x [m]');
grid on
ax = gca;
ax.YDir = 'reverse';

saveas(gcf,'Simple_Supported_Distributed_Beam.png');


%% Cantilever Beam (One-Point)

% Calculation
for i=1:length(x)
    if (x(i) < 1)
        V(i) = 1;
        M(i) = x(i)-l/2;
        theta(i) = -(x(i)^2/2-l/2*x(i))/E/I;
        w(i) = -(x(i)^3/6-l/4*x(i)^2)/E/I;
    else
        V(i) = 0;
        M(i) = 0;
        theta(i) = l^2/8/E/I;
        w(i) = l^2/E/I*(6*x(i)-l)/48;
    end
end

% Drawing
f = figure;
f.Position = [10 10 800 600];
subplot(2,2,1);
plot(x,V,'r-');
xlim([0 l]);
title('Shear Force');
ylabel('V [N]');
xlabel('x [m]');
grid on

subplot(2,2,2);
plot(x,M,'r-');
xlim([0 l]);
title('Bending Moment');
ylabel('M [Nm]');
xlabel('x [m]');
grid on

subplot(2,2,3);
plot(x,theta,'r-');
xlim([0 l]);
title('Beam Slope');
ylabel('\theta');
xlabel('x [m]');
grid on
ax = gca;
ax.YDir = 'reverse';

subplot(2,2,4);
plot(x,w,'r-');
xlim([0 l]);
title('Displacement');
ylabel('w [m]');
xlabel('x [m]');
grid on
ax = gca;
ax.YDir = 'reverse';

saveas(gcf,'Cantilever_One_Beam.png');


%% Cantilever Beam (Distributed)

% Calculation
for i=1:length(x)
    V(i) = -x(i);
    M(i) = -x(i)^2/2;
    theta(i) = (x(i)^3-l^3)/6/E/I;
    w(i) = (x(i)^4-4*l^3*x(i)+3*l^4)/24/E/I;
end

% Drawing

f = figure;
f.Position = [10 10 800 600];
subplot(2,2,1);
plot(x,V,'r-');
xlim([0 l]);
title('Shear Force');
ylabel('V [N]');
xlabel('x [m]');
grid on

subplot(2,2,2);
plot(x,M,'r-');
xlim([0 l]);
title('Bending Moment');
ylabel('M [Nm]');
xlabel('x [m]');
grid on

subplot(2,2,3);
plot(x,theta,'r-');
xlim([0 l]);
title('Beam Slope');
ylabel('\theta');
xlabel('x [m]');
grid on
ax = gca;
ax.YDir = 'reverse';

subplot(2,2,4);
plot(x,w,'r-');
xlim([0 l]);
title('Displacement');
ylabel('w [m]');
xlabel('x [m]');
grid on
ax = gca;
ax.YDir = 'reverse';

saveas(gcf,'Cantilever_Distributed_Beam.png');
